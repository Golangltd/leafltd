package entitas

import (
	"fmt"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestEntity(t *testing.T) {

	Convey("When given a new entity", t, func() {
		e := NewEntity(0)
		c1 := NewComponentA(1)
		c2 := NewComponentB(2.0)
		types := []ComponentType{c1.Type(), c2.Type()}

		Convey("It has the correct ID", func() {
			So(e.ID(), ShouldEqual, 0)
		})

		Convey("When component of that type was added", func() {
			e.AddComponent(c1)

			Convey("It has component of type", func() {
				So(e.HasComponent(c1.Type()), ShouldBeTrue)
			})

			Convey("It returns an error when a component is already added", func() {
				So(e.AddComponent(c1).Error(), ShouldEqual, "component exists")
			})

			Convey("It doesn't have components of other types", func() {
				So(e.HasComponent(types...), ShouldBeFalse)
			})

			Convey("It has any components of types", func() {
				So(e.HasAnyComponent(types...), ShouldBeTrue)
			})

			Convey("It removes a component of type", func() {
				e.RemoveComponent(c1.Type())
				So(e.HasComponent(c1.Type()), ShouldBeFalse)
				So(e.Components(), ShouldBeEmpty)
			})

			Convey("It replaces an existing component", func() {
				c11 := NewComponentA(2)
				e.ReplaceComponent(c11)
				actual, err := e.Component(c1.Type())
				So(err, ShouldBeNil)
				So(actual, ShouldNotEqual, c1)
				So(actual, ShouldEqual, c11)
			})
		})

		Convey("It doesn't have component of type when no component of that type was added", func() {
			So(e.HasComponent(c1.Type()), ShouldBeFalse)
		})

		Convey("It doesn't have components of types when no components of these types were added", func() {
			So(e.HasComponent([]ComponentType{c1.Type()}...), ShouldBeFalse)
		})

		Convey("It has components of types when all components of these types were added", func() {
			e.AddComponent(c1, c2)
			So(e.HasComponent(types...), ShouldBeTrue)
		})

		Convey("It doesn't have any components of types when no components of these types were added", func() {
			So(e.HasAnyComponent(types...), ShouldBeFalse)
		})

		Convey("It gets a component of type", func() {
			e.AddComponent(c2)
			So(e.Components(), ShouldResemble, []Component{c2})
			c, err := e.Component(c2.Type())
			So(c, ShouldEqual, c2)
			So(err, ShouldBeNil)
		})

		Convey("It doesn't get a component of type that wasn't added", func() {
			c, err := e.Component(c1.Type())
			So(c, ShouldBeNil)
			So(err.Error(), ShouldEqual, "component does not exist")
		})

		Convey("It adds a component when replacing a non existing component", func() {
			e.ReplaceComponent(c1)
			c, err := e.Component(c1.Type())
			So(err, ShouldBeNil)
			So(c, ShouldEqual, c1)
		})

		Convey("It returns an empty array of components when no components were added", func() {
			So(e.Components(), ShouldBeEmpty)
		})

		Convey("It returns an empty array of component indices when no components were added", func() {
			So(e.ComponentIndices(), ShouldBeEmpty)
		})

		Convey("It returns all components", func() {
			e.AddComponent(c1, c2)
			So(e.Components(), ShouldContain, c1)
			So(e.Components(), ShouldContain, c2)
		})

		Convey("It returns all component indices", func() {
			e.AddComponent(c1, c2)
			So(e.ComponentIndices(), ShouldContain, c1.Type())
			So(e.ComponentIndices(), ShouldContain, c2.Type())
		})

		Convey("It removes all components", func() {
			e.AddComponent(c1, c2)
			e.RemoveAllComponents()
			actual, err := e.Component(c1.Type())
			So(actual, ShouldBeNil)
			So(err.Error(), ShouldEqual, "component does not exist")
			actual, err = e.Component(c2.Type())
			So(actual, ShouldBeNil)
			So(err.Error(), ShouldEqual, "component does not exist")
		})

		Convey("When adding a component", func() {
			willBeRemoved := false
			removed := false
			e.AddComponent(c1)

			e.AddCallback(ComponentWillBeRemoved, func(e Entity, c Component) {
				willBeRemoved = true
			})

			e.AddCallback(ComponentRemoved, func(e Entity, c Component) {
				removed = true
			})

			Convey("When removing this component", func() {
				e.RemoveComponent(c1.Type())

				Convey("It should call OnComponentWillBeRemoved", func() {
					So(willBeRemoved, ShouldBeTrue)
				})
			})

			Convey("When removing all components", func() {
				e.RemoveAllComponents()

				Convey("It should call OnComponentWillBeRemoved", func() {
					So(willBeRemoved, ShouldBeTrue)
				})

				Convey("It should call OnComponentRemoved", func() {
					So(removed, ShouldBeTrue)
				})
			})

			Convey("When removing a component it does not contain", func() {
				e.RemoveComponent(c2.Type())

				Convey("It should not call OnComponentWillBeRemoved", func() {
					So(willBeRemoved, ShouldBeFalse)
				})

				Convey("It should not call OnComponentRemoved", func() {
					So(removed, ShouldBeFalse)
				})
			})
		})

		// Convey("dispatches OnComponentWillBeRemoved when called manually and component exists", func() {})

		Convey("It can be printed", func() {
			e.AddComponent(c1, c2)
			So(fmt.Sprintf("%v", e), ShouldEqual, "Entity_0([A B])")
		})

		Convey("When it has callbacks", func() {
			added := false
			var added_e Entity
			var added_c Component
			replaced := false
			var replaced_e Entity
			var replaced_c Component
			removed := false
			var removed_e Entity
			var removed_c Component
			c := NewComponentA(0)

			e.AddCallback(ComponentAdded, func(e Entity, c Component) {
				added = true
				added_e = e
				added_c = c
			})
			e.AddCallback(ComponentReplaced, func(e Entity, c Component) {
				replaced = true
				replaced_e = e
				replaced_c = c
			})
			e.AddCallback(ComponentRemoved, func(e Entity, c Component) {
				removed = true
				removed_e = e
				removed_c = c
			})
			Convey("When a component is added", func() {
				e.AddComponent(c)

				Convey("It should be called when added", func() {
					So(added, ShouldBeTrue)
					So(added_e, ShouldEqual, e)
					So(added_c, ShouldEqual, c)
				})

				Convey("It should be called when replaced", func() {
					e.ReplaceComponent(c)
					So(replaced, ShouldBeTrue)
					So(replaced_e, ShouldEqual, e)
					So(replaced_c, ShouldEqual, c)
				})

				Convey("It should be called when removed", func() {
					e.RemoveComponent(c.Type())
					So(removed, ShouldBeTrue)
					So(removed_e, ShouldEqual, e)
					So(removed_c, ShouldEqual, c)
				})
			})

			Convey("When removing all callbacks", func() {
				e.RemoveAllCallbacks()

				Convey("When a component is added", func() {
					e.AddComponent(c)

					Convey("It should not be called when added", func() {
						So(added, ShouldBeFalse)
					})
				})
			})
		})
	})
}

func BenchmarkEntityAddComponents(b *testing.B) {
	c1 := NewComponentA(1)
	c2 := NewComponentB(1.0)
	c3 := NewComponentC()
	e := NewEntity(0)
	for n := 0; n < b.N; n++ {
		e.AddComponent(c1, c2, c3)
	}
}

func BenchmarkEntityReplaceNew(b *testing.B) {
	c1 := NewComponentA(1)
	c2 := NewComponentB(1.0)
	c3 := NewComponentC()
	e := NewEntity(0)
	for n := 0; n < b.N; n++ {
		e.ReplaceComponent(c1, c2, c3)
	}
}

func BenchmarkEntityReplaceOld(b *testing.B) {
	c1 := NewComponentA(1)
	c2 := NewComponentB(1.0)
	c3 := NewComponentC()
	e := NewEntity(0)
	e.AddComponent(c1, c2, c3)
	for n := 0; n < b.N; n++ {
		e.ReplaceComponent(c1, c2, c3)
	}
}

func BenchmarkEntityRemoveComponents(b *testing.B) {
	c1 := NewComponentA(1)
	c2 := NewComponentB(1.0)
	c3 := NewComponentC()
	e := NewEntity(0)
	e.AddComponent(c1, c2, c3)
	for n := 0; n < b.N; n++ {
		e.RemoveComponent(ComponentA, ComponentB, ComponentC)
	}
}

func BenchmarkEntityRemoveAll(b *testing.B) {
	c1 := NewComponentA(1)
	c2 := NewComponentB(1.0)
	c3 := NewComponentC()
	e := NewEntity(0)
	e.AddComponent(c1, c2, c3)
	for n := 0; n < b.N; n++ {
		e.RemoveAllComponents()
	}
}
