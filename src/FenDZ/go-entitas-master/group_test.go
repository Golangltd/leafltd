package entitas

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestGroup(t *testing.T) {

	Convey("Given a new group matching all of one component", t, func() {
		g := NewGroup(AllOf(ComponentA))
		e1 := NewEntity(0)
		e1.AddComponent(NewComponentA(5))

		Convey("It gets empty group for matcher when no entities were created", func() {
			So(g.Entities(), ShouldBeEmpty)
		})

		Convey("It should not contain an entity", func() {
			So(g.ContainsEntity(e1), ShouldBeFalse)
		})

		Convey("When entity is added", func() {
			g.HandleEntity(e1)

			Convey("The entity should be in the group's entities", func() {
				So(g.Entities(), ShouldContain, e1)
			})

			Convey("It is not empty", func() {
				So(len(g.Entities()), ShouldEqual, 1)
			})

			Convey("It should contain the matching entity", func() {
				So(g.ContainsEntity(e1), ShouldBeTrue)
			})

			Convey("It should still exist when added twice", func() {
				g.HandleEntity(e1)
				So(g.ContainsEntity(e1), ShouldBeTrue)
			})

			Convey("When another entity is added", func() {
				e2 := NewEntity(1)
				e2.AddComponent(NewComponentA(5))
				g.HandleEntity(e2)

				Convey("It should contain the matching entities", func() {
					So(g.ContainsEntity(e1), ShouldBeTrue)
					So(g.ContainsEntity(e2), ShouldBeTrue)
				})

				Convey("It should return the matching entities", func() {
					So(g.Entities(), ShouldResemble, []Entity{e1, e2})
				})

				Convey("When removing one entity", func() {
					e1.RemoveComponent(ComponentA)
					g.HandleEntity(e1)

					Convey("It should still contain the other entity", func() {
						So(g.ContainsEntity(e2), ShouldBeTrue)
					})

					Convey("It should still return the other entity", func() {
						So(g.Entities(), ShouldResemble, []Entity{e2})
					})

					Convey("When yet another entity is added", func() {
						e3 := NewEntity(2)
						e3.AddComponent(NewComponentA(5))
						g.HandleEntity(e3)

						Convey("It should contain the old and new entity", func() {
							So(g.ContainsEntity(e2), ShouldBeTrue)
							So(g.ContainsEntity(e3), ShouldBeTrue)
						})

						Convey("It should return the old and new entity", func() {
							So(g.Entities(), ShouldResemble, []Entity{e3, e2})
						})
					})
				})
			})
		})

		Convey("When non-matching entity is added", func() {
			e1.RemoveComponent(ComponentA)
			g.HandleEntity(e1)

			Convey("The entity should not be in the group's entities", func() {
				So(g.Entities(), ShouldNotContain, e1)
			})
		})

		Convey("When an matching entity component is removed", func() {
			g.HandleEntity(e1)
			e1.RemoveComponent(ComponentA)
			g.HandleEntity(e1)

			Convey("The entity should not be in the group's entities", func() {
				So(g.Entities(), ShouldNotContain, e1)
			})
		})

	})

	Convey("Given a new group matching all of two component", t, func() {
		g := NewGroup(AllOf(ComponentA, ComponentB))
		e1 := NewEntity(0)
		e1.AddComponent(NewComponentA(5))
		e1.AddComponent(NewComponentC())
		e1.AddComponent(NewComponentB(5))

		Convey("When entity is added", func() {
			g.HandleEntity(e1)

			Convey("The entity should be in the group's entities", func() {
				So(g.Entities(), ShouldContain, e1)
			})
		})
	})
}

func BenchmarkGroupAddEntity(b *testing.B) {
	BenchGroup(b, func(e *entity, g Group) {
		e.id = EntityID(1000)
		g.HandleEntity(e)
	})
}

func BenchmarkGroupRemoveEntity(b *testing.B) {
	BenchGroup(b, func(e *entity, g Group) {
		e.id = EntityID(500)
		Entity(e).RemoveComponent(ComponentA)
		g.HandleEntity(e)
	})
}

func BenchmarkGroupEntities(b *testing.B) {
	BenchGroup(b, func(e *entity, g Group) {
		e.id = EntityID(500)
		Entity(e).RemoveComponent(ComponentA)
		g.HandleEntity(e)

		g.Entities()
	})
}

func BenchmarkGroupContainsEntity(b *testing.B) {
	BenchGroup(b, func(e *entity, g Group) {
		e.id = EntityID(500)
		g.ContainsEntity(e)
	})
}

func BenchGroup(b *testing.B, f func(*entity, Group)) {
	c1 := NewComponentA(1)
	c2 := NewComponentB(1.0)
	g := NewGroup(AllOf(ComponentA, ComponentB))

	e := &entity{
		id:         0,
		components: make(map[ComponentType]Component),
		callbacks:  make(map[ComponentEvent][]ComponentCallback),
	}
	Entity(e).AddComponent(c1, c2)

	for i := 0; i < 1000; i++ {
		e.id = EntityID(i)
		g.HandleEntity(e)
	}

	for n := 0; n < b.N; n++ {
		f(e, g)
	}
}
