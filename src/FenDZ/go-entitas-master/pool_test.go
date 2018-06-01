package entitas

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestPool(t *testing.T) {
	Convey("Given a new pool", t, func() {
		p := NewPool(NumComponents, 0)

		Convey("It increments creationIndex", func() {
			So(p.CreateEntity().ID(), ShouldEqual, 0)
			So(p.CreateEntity().ID(), ShouldEqual, 1)
		})

		Convey("It starts with given creationIndex", func() {
			So(NewPool(NumComponents, 42).CreateEntity().ID(), ShouldEqual, 42)
		})

		Convey("It has no entities when no entities were created", func() {
			So(p.Entities(), ShouldBeEmpty)
		})

		Convey("It creates entity", func() {
			var e = p.CreateEntity()
			So(e, ShouldNotBeNil)
			So(e, ShouldHaveSameTypeAs, NewEntity(-1))
		})
		Convey("It gets total entity count", func() {
			p.CreateEntity()
			So(p.Count(), ShouldEqual, 1)
		})

		Convey("It doesn't have entites that were not created with CreateEntity()", func() {
			So(p.HasEntity(NewEntity(-1)), ShouldBeFalse)
		})

		Convey("It has entites that were created with CreateEntity()", func() {
			So(p.HasEntity(p.CreateEntity()), ShouldBeTrue)
		})

		Convey("It returns all created entities", func() {
			e1 := p.CreateEntity()
			e2 := p.CreateEntity()
			entities := p.Entities()
			So(entities, ShouldContain, e1)
			So(entities, ShouldContain, e2)
			So(len(entities), ShouldEqual, 2)
		})

		Convey("It destroys entity and removes it", func() {
			e := p.CreateEntity()
			p.DestroyEntity(e)
			So(p.HasEntity(e), ShouldBeFalse)
		})

		Convey("It destroys an entity and removes all its components", func() {
			e := p.CreateEntity()
			e.AddComponent(NewComponentA(1))
			p.DestroyEntity(e)
			So(e.Components(), ShouldBeEmpty)
		})

		Convey("It destroys an entity and removes all callbacks", func() {
			e := p.CreateEntity()
			p.DestroyEntity(e)
			So(e.HasCallbacks(), ShouldBeFalse)
		})

		Convey("It destroys all entites", func() {
			e := p.CreateEntity()
			e.AddComponent(NewComponentA(1))
			p.CreateEntity()
			p.DestroyAllEntities()
			So(p.Entities(), ShouldBeEmpty)
			So(e.Components(), ShouldBeEmpty)
			So(e.HasCallbacks(), ShouldBeFalse)
		})

		// TODO: Possible in Go?
		// Convey("It caches entities", func() {
		// 	p.CreateEntity()
		// 	entities1 := p.Entities()
		// 	entities2 := p.Entities()
		// 	So(entities1, ShouldResemble, entities2)
		// 	p.DestroyEntity(p.CreateEntity())
		// 	So(p.Entities(), ShouldNotResemble, entities1)
		// })

		// Same as "It creates entity"
		// Convey("It gets entity from object pool", func() {
		// 	e := p.CreateEntity()
		// 	So(e, ShouldNotBeNil)
		// 	So(e, ShouldHaveSameTypeAs, NewEntity(-1))
		// })

		Convey("When entities are cached", func() {

			Convey("It destroys entity when pushing back to object pool", func() {
				e := p.CreateEntity()
				e.AddComponent(NewComponentA(1))
				p.DestroyEntity(e)
				So(e.HasComponent(ComponentA), ShouldBeFalse)
			})

			Convey("It returns pushed entity", func() {
				e := p.CreateEntity()
				e.AddComponent(NewComponentA(1))
				p.DestroyEntity(e)
				entity := p.CreateEntity()
				So(entity.HasComponent(ComponentA), ShouldBeFalse)
				So(entity, ShouldEqual, e)
			})

			Convey("It returns new entity", func() {
				e := p.CreateEntity()
				e.AddComponent(NewComponentA(1))
				p.DestroyEntity(e)
				p.CreateEntity()
				entityFromPool := p.CreateEntity()
				So(entityFromPool.HasComponent(ComponentA), ShouldBeFalse)
				So(entityFromPool, ShouldNotEqual, e)
			})

			Convey("It sets up entity from pool", func() {
				p.DestroyEntity(p.CreateEntity())
				g := p.Group(AllOf(ComponentA))
				e := p.CreateEntity()
				e.AddComponent(NewComponentA(1))
				So(g.Entities(), ShouldContain, e)
			})

		})

		Convey("When entities are retrieved", func() {
			matcher := AllOf(ComponentA, ComponentB)

			eAB1 := p.CreateEntity()
			eAB1.AddComponent(NewComponentA(1))
			eAB1.AddComponent(NewComponentB(1.1))
			eAB2 := p.CreateEntity()
			eAB2.AddComponent(NewComponentA(2))
			eAB2.AddComponent(NewComponentB(2.2))
			eA := p.CreateEntity()
			eA.AddComponent(NewComponentA(3))

			Convey("It gets group with matching entities", func() {
				g := p.Group(matcher).Entities()
				So(len(g), ShouldEqual, 2)
				So(g, ShouldContain, eAB1)
				So(g, ShouldContain, eAB2)
			})

			Convey("It gets cached group", func() {
				So(p.Group(matcher), ShouldEqual, p.Group(matcher))
			})

			Convey("It cached group contains newly created matching entity", func() {
				g := p.Group(matcher)
				eA.AddComponent(NewComponentB(3.3))
				So(g.Entities(), ShouldContain, eA)
			})

			Convey("It cached group doesn't contain entity which are not matching anymore", func() {
				g := p.Group(matcher)
				eAB1.RemoveComponent(ComponentA)
				So(g.Entities(), ShouldNotContain, eAB1)
			})

			Convey("It removes destroyed entity", func() {
				g := p.Group(matcher)
				p.DestroyEntity(eAB1)
				So(g.Entities(), ShouldNotContain, eAB1)
			})

			Convey("It ignores adding components to destroyed entity", func() {
				g := p.Group(matcher)
				p.DestroyEntity(eA)
				eA.AddComponent(NewComponentA(3))
				eA.AddComponent(NewComponentB(3.3))
				So(g.Entities(), ShouldNotContain, eA)
			})

			Convey("It throws when destroying an entity the pool doesn't contain", func() {
				e := p.CreateEntity()
				p.DestroyEntity(e)
				So(func() { p.DestroyEntity(e) }, ShouldPanic)
			})

			Convey("Its groups dispatches OnEntityWillBeRemoved, OnEntityRemoved and OnEntityAdded when replacing components", func() {
				g := p.Group(matcher)
				didDispatchWillBeRemoved := 0
				didDispatchRemoved := 0
				didDispatchAdded := 0
				var eventGroupWillBeRemoved Group
				var eventGroupRemoved Group
				var eventGroupAdded Group
				var eventEntityWillBeRemoved Entity
				var eventEntityRemoved Entity
				var eventEntityAdded Entity
				g.AddCallback(EntityWillBeRemoved, func(group Group, entity Entity) {
					eventGroupWillBeRemoved = group
					eventEntityWillBeRemoved = entity
					didDispatchWillBeRemoved++
				})
				g.AddCallback(EntityRemoved, func(group Group, entity Entity) {
					eventGroupRemoved = group
					eventEntityRemoved = entity
					didDispatchRemoved++
				})
				g.AddCallback(EntityAdded, func(group Group, entity Entity) {
					eventGroupAdded = group
					eventEntityAdded = entity
					didDispatchAdded++
				})
				eAB1.WillRemoveComponent(ComponentA)
				eAB1.ReplaceComponent(NewComponentA(1))

				So(eventGroupWillBeRemoved, ShouldEqual, g)
				So(eventGroupRemoved, ShouldEqual, g)
				So(eventGroupAdded, ShouldEqual, g)
				So(eventEntityWillBeRemoved, ShouldEqual, eAB1)
				So(eventEntityRemoved, ShouldEqual, eAB1)
				So(eventEntityAdded, ShouldEqual, eAB1)
				So(didDispatchWillBeRemoved, ShouldEqual, 1)
				So(didDispatchRemoved, ShouldEqual, 1)
				So(didDispatchAdded, ShouldEqual, 1)
			})

		})

		Convey("Given a group created using a compound matcher", func() {
			allOfA := AllOf(ComponentA)
			allOfB := AllOf(ComponentB)
			compound := AnyOf(allOfA, allOfB)
			group := p.Group(compound)
			e := p.CreateEntity()

			Convey("It adds entity when matching", func() {
				e.AddComponent(NewComponentA(1))
				So(compound.Matches(e), ShouldBeTrue)
				So(len(group.Entities()), ShouldEqual, 1)
			})

			Convey("It doesn't add entity when not matching", func() {
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeFalse)
				So(len(group.Entities()), ShouldEqual, 0)
			})

			Convey("It removes entity when not matching anymore", func() {
				e.AddComponent(NewComponentA(-1))
				e.RemoveComponent(ComponentA)
				So(len(group.Entities()), ShouldEqual, 0)
			})

			Convey("It doesn't remove entity when still matching", func() {
				e.AddComponent(NewComponentA(-2))
				e.AddComponent(NewComponentB(-2.2))
				e.RemoveComponent(ComponentB)
				So(len(group.Entities()), ShouldEqual, 1)
			})

			Convey("It will remove entity", func() {
				didWillRemove := 0
				group.AddCallback(EntityWillBeRemoved, func(g Group, e Entity) { didWillRemove++ })
				e.AddComponent(NewComponentA(-3))
				e.WillRemoveComponent(ComponentA)
				So(didWillRemove, ShouldEqual, 1)
			})

			Convey("It won't remove entity when still matching", func() {
				group.AddCallback(EntityWillBeRemoved, func(g Group, e Entity) { t.Fail() })
				e.AddComponent(NewComponentA(-4))
				e.AddComponent(NewComponentB(-4.4))
				e.WillRemoveComponent(ComponentB)
			})
		})

		Convey("Given an AllOf containing a NoneOf", func() {
			allOfAB := AllOf(ComponentA, ComponentB)
			noneOfC := NoneOf(ComponentC)
			compound := AllOf(allOfAB, noneOfC)
			group := p.Group(compound)
			e := p.CreateEntity()

			Convey("It adds entity when matching", func() {
				e.AddComponent(NewComponentA(-1))
				e.AddComponent(NewComponentB(-1.1))
				So(compound.Matches(e), ShouldBeTrue)
				So(len(group.Entities()), ShouldEqual, 1)
			})

			Convey("It doesn't add entity when not matching", func() {
				e.AddComponent(NewComponentA(-2))
				e.AddComponent(NewComponentB(-2.2))
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeFalse)
				So(len(group.Entities()), ShouldEqual, 0)
			})

			Convey("It removes entity when not matching anymore", func() {
				e.AddComponent(NewComponentA(-3))
				e.AddComponent(NewComponentB(-3.3))
				e.RemoveComponent(ComponentB)
				So(len(group.Entities()), ShouldEqual, 0)
			})

			Convey("It doesn't remove entity when still matching", func() {
				e.AddComponent(NewComponentA(-4))
				e.AddComponent(NewComponentB(-4.4))
				e.AddComponent(NewComponentC())
				e.RemoveComponent(ComponentC)
				So(len(group.Entities()), ShouldEqual, 1)
			})

			Convey("It will remove entity", func() {
				didWillRemove := 0
				group.AddCallback(EntityWillBeRemoved, func(g Group, e Entity) { didWillRemove++ })
				e.AddComponent(NewComponentA(-5))
				e.AddComponent(NewComponentB(-5.5))
				e.WillRemoveComponent(ComponentA)
				So(didWillRemove, ShouldEqual, 1)
			})

			Convey("It won't remove entity when still matching", func() {
				group.AddCallback(EntityWillBeRemoved, func(g Group, e Entity) { t.Fail() })
				e.AddComponent(NewComponentA(-6))
				e.AddComponent(NewComponentB(-6.6))
				e.AddComponent(NewComponentC())
				e.WillRemoveComponent(ComponentC)
			})
		})
	})
}

func BenchmarkPoolCreateGroup(b *testing.B) {
	p := NewPool(NumComponents, 0)

	for i := 0; i < 2000; i++ {
		p.CreateEntity(
			NewComponentA(i),
			NewComponentB(float32(i)),
			NewComponentC(),
		)
	}

	for n := 0; n < b.N; n++ {
		g := p.Group(AllOf(ComponentA))
		g.Entities()
	}
}
