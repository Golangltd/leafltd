package entitas

import (
	"sort"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestMatcher(t *testing.T) {
	Convey("Subject: Matchers", t, func() {
		Convey("Given a few entities", func() {
			eA := NewEntity(1)
			eC := NewEntity(2)
			eAB := NewEntity(3)
			eABC := NewEntity(4)
			eA.AddComponent(NewComponentA(1))
			eC.AddComponent(NewComponentC())
			eAB.AddComponent(NewComponentA(3))
			eAB.AddComponent(NewComponentB(3.3))
			eABC.AddComponent(NewComponentA(4))
			eABC.AddComponent(NewComponentB(4.4))
			eABC.AddComponent(NewComponentC())

			Convey("When creating an AllOf matcher", func() {
				m := AllOf(ComponentA, ComponentA, ComponentB)

				Convey("It doesn't match", func() {
					So(m.Matches(eA), ShouldBeFalse)
				})

				Convey("It matches", func() {
					So(m.Matches(eAB), ShouldBeTrue)
					So(m.Matches(eABC), ShouldBeTrue)
				})

				Convey("It gets triggering types without duplicates", func() {
					So(len(m.ComponentTypes()), ShouldEqual, 2)
					So(m.ComponentTypes(), ShouldContain, ComponentA)
					So(m.ComponentTypes(), ShouldContain, ComponentB)
				})
			})

			Convey("When creating an AnyOf matcher", func() {
				m := AnyOf(ComponentA, ComponentA, ComponentB)

				Convey("It doesn't match", func() {
					So(m.Matches(eC), ShouldBeFalse)
				})

				Convey("It matches", func() {
					So(m.Matches(eA), ShouldBeTrue)
					So(m.Matches(eAB), ShouldBeTrue)
					So(m.Matches(eABC), ShouldBeTrue)
				})
			})

			Convey("When creating a NoneOf matcher", func() {
				m := NoneOf(ComponentA, ComponentB)

				Convey("It doesn't match", func() {
					So(m.Matches(eA), ShouldBeFalse)
					So(m.Matches(eAB), ShouldBeFalse)
				})

				Convey("It matches", func() {
					So(m.Matches(eC), ShouldBeTrue)
					So(m.Matches(NewEntity(-1)), ShouldBeTrue)
				})
			})
		})

		Convey("Equality", func() {
			Convey("It equals equal AllOfMatcher", func() {
				m1 := allOfAB()
				m2 := allOfAB()
				So(m1, ShouldNotEqual, m2)
				So(m1.Equals(m2), ShouldBeTrue)
			})

			Convey("AllOf equals another AllOf independent from the order of components", func() {
				m1 := allOfAB()
				m2 := AllOf(ComponentB, ComponentA)

				So(m1, ShouldNotEqual, m2)
				So(m1.Equals(m2), ShouldBeTrue)
			})

			Convey("AllOf doesn't equal a different AllOf", func() {
				m1 := AllOf(ComponentA)
				m2 := allOfAB()
				So(m1.Equals(m2), ShouldBeFalse)
			})

			Convey("AllOf generates same hash for identical AllOf", func() {
				m1 := allOfAB()
				m2 := allOfAB()
				So(m1.Hash(), ShouldEqual, m2.Hash())
			})

			Convey("AllOf generates same hash independent from the order of components", func() {
				m1 := AllOf(ComponentA, ComponentB)
				m2 := AllOf(ComponentB, ComponentA)
				So(m1.Hash(), ShouldEqual, m2.Hash())
			})

			Convey("AllOf doesn't equal AnyOf with same components", func() {
				m1 := AllOf(ComponentA, ComponentB)
				m2 := AnyOf(ComponentA, ComponentB)
				So(m1.Equals(m2), ShouldBeFalse)
			})

			// TODO: Add test of AnyOf and NoneOf equals/hash

			a := ComponentType(0)
			b := ComponentType(1)
			c := ComponentType(2)
			d := ComponentType(3)

			Convey("Matchers doesn't equal when only components are same", func() {
				all1 := AllOf(a, b)
				all2 := AllOf(c, d)
				c1 := AllOf(all1, all2)

				any1 := AnyOf(a, b)
				any2 := AnyOf(c, d)
				c2 := AllOf(any1, any2)

				So(c1.Equals(c2), ShouldBeFalse)
			})

			Convey("Matchers doesn't equal when not same type", func() {
				all1 := AllOf(a, b)
				all2 := AllOf(c, d)
				c1 := AllOf(all1, all2)
				c2 := AnyOf(all1, all2)

				So(c1.Equals(c2), ShouldBeFalse)
			})

			Convey("Matchers equals when equal", func() {
				all1 := AllOf(a, b)
				all2 := AllOf(c, d)
				c1 := AllOf(all1, all2)

				all3 := AllOf(a, b)
				all4 := AllOf(c, d)
				c2 := AllOf(all3, all4)

				So(c1.Equals(c2), ShouldBeTrue)
			})

		})

		Convey("When creating AllOf matchers", func() {
			allAB := AllOf(ComponentB, ComponentA)
			allBC := AllOf(ComponentC, ComponentB)
			anyAB := AnyOf(ComponentB, ComponentA)
			anyBC := AnyOf(ComponentC, ComponentB)

			Convey("It has all indices in order", func() {
				compound := AllOf(allAB, allBC)
				actual := compound.ComponentTypes()
				sort.Sort(TypesByType(actual))
				So(actual, ShouldResemble, []ComponentType{
					ComponentA,
					ComponentB,
					ComponentC,
				})
			})

			Convey("It has all indices in order (mixed)", func() {
				compound := AllOf(allAB, anyBC)
				actual := compound.ComponentTypes()
				sort.Sort(TypesByType(actual))
				So(actual, ShouldResemble, []ComponentType{
					ComponentA,
					ComponentB,
					ComponentC,
				})
			})

			Convey("It matches", func() {
				compound := AllOf(allAB, allBC)
				e := NewEntity(-1)
				e.AddComponent(NewComponentA(-1))
				e.AddComponent(NewComponentB(-1.1))
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeTrue)
			})

			Convey("It matches (mixed)", func() {
				compound := AllOf(allAB, anyBC)
				e := NewEntity(-2)
				e.AddComponent(NewComponentA(-2))
				e.AddComponent(NewComponentB(-2.2))
				So(compound.Matches(e), ShouldBeTrue)
			})

			Convey("It doesn't match", func() {
				compound := AllOf(allAB, allBC)
				e := NewEntity(-3)
				e.AddComponent(NewComponentB(-3.3))
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeFalse)
			})

			Convey("It doesn't match (mixed)", func() {
				compound := AllOf(anyAB, anyBC)
				e := NewEntity(-4)
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeFalse)
			})
		})

		Convey("When creating anyOf matchers", func() {
			allAB := AllOf(ComponentB, ComponentA)
			allBC := AllOf(ComponentC, ComponentB)
			anyBC := AnyOf(ComponentC, ComponentB)

			Convey("It has all indices in order", func() {
				compound := AnyOf(allAB, allBC)
				actual := compound.ComponentTypes()
				sort.Sort(TypesByType(actual))
				So(actual, ShouldResemble, []ComponentType{
					ComponentA,
					ComponentB,
					ComponentC,
				})
			})

			Convey("It has all indices in order (mixed)", func() {
				compound := AnyOf(allAB, anyBC)
				actual := compound.ComponentTypes()
				sort.Sort(TypesByType(actual))
				So(actual, ShouldResemble, []ComponentType{
					ComponentA,
					ComponentB,
					ComponentC,
				})
			})

			Convey("It matches", func() {
				compound := AnyOf(allBC, allAB)
				e := NewEntity(-1)
				e.AddComponent(NewComponentB(-1.1))
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeTrue)
			})

			Convey("It matches (mixed)", func() {
				compound := AnyOf(allAB, anyBC)
				e := NewEntity(-2)
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeTrue)
			})

			Convey("It doesn't match", func() {
				compound := AnyOf(allAB, allBC)
				e := NewEntity(-3)
				e.AddComponent(NewComponentA(-3))
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeFalse)
			})
		})

		Convey("When creating NoneOf matchers", func() {
			allAB := AllOf(ComponentB, ComponentA)
			allBC := AllOf(ComponentC, ComponentB)
			allAC := AllOf(ComponentC, ComponentA)
			anyBC := AnyOf(ComponentC, ComponentB)

			Convey("It has all indices in order", func() {
				compound := NoneOf(allAB, allBC)
				actual := compound.ComponentTypes()
				sort.Sort(TypesByType(actual))
				So(actual, ShouldResemble, []ComponentType{
					ComponentA,
					ComponentB,
					ComponentC,
				})
			})

			Convey("It matches", func() {
				compound := NoneOf(allAB, allAC)
				e := NewEntity(-1)
				e.AddComponent(NewComponentB(-1.2))
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeTrue)
			})

			Convey("It matches (mixed)", func() {
				compound := NoneOf(allAB, anyBC)
				e := NewEntity(-2)
				e.AddComponent(NewComponentA(-2))
				So(compound.Matches(e), ShouldBeTrue)
			})

			Convey("It doesn't match", func() {
				compound := NoneOf(allAB, anyBC)
				e := NewEntity(-3)
				e.AddComponent(NewComponentC())
				So(compound.Matches(e), ShouldBeFalse)
			})
		})

		Convey("Nested matchers", func() {

			Convey("Works like a charm", func() {
				allAB := AllOf(ComponentA, ComponentB)
				allCD := AllOf(ComponentC, ComponentD)
				allEF := AllOf(ComponentE, ComponentF)
				anyEF := AnyOf(ComponentE, ComponentF)

				c1 := AllOf(allAB, allCD, anyEF)
				c2 := AllOf(allAB, allCD, allEF)
				c3 := AnyOf(allAB, allCD, allEF)

				e := NewEntity(-1)
				e.AddComponent(NewComponentA(1))
				e.AddComponent(NewComponentB(1.1))
				e.AddComponent(NewComponentC())
				e.AddComponent(NewComponentD())
				e.AddComponent(NewComponentE())

				So(c1.Matches(e), ShouldBeTrue)
				So(c2.Matches(e), ShouldBeFalse)
				So(c3.Matches(e), ShouldBeTrue)

				nested1 := AllOf(c1, c2)
				nested2 := AnyOf(c1, c2)

				So(nested1.Matches(e), ShouldBeFalse)
				So(nested2.Matches(e), ShouldBeTrue)

				nested1types := nested1.ComponentTypes()
				sort.Sort(TypesByType(nested1types))
				So(nested1types, ShouldResemble, []ComponentType{
					ComponentA,
					ComponentB,
					ComponentC,
					ComponentD,
					ComponentE,
					ComponentF,
				})
				nested2types := nested2.ComponentTypes()
				sort.Sort(TypesByType(nested2types))
				So(nested2types, ShouldResemble, []ComponentType{
					ComponentA,
					ComponentB,
					ComponentC,
					ComponentD,
					ComponentE,
					ComponentF,
				})

				nestedAll := AllOf(nested1, nested2)
				nestedAny := AnyOf(nested1, nested2)
				So(nestedAll.Matches(e), ShouldBeFalse)
				So(nestedAny.Matches(e), ShouldBeTrue)

				So(NoneOf(nestedAll, nestedAny).Matches(e), ShouldBeFalse)
			})
		})

		Convey("Given all types of matchers", func() {
			allOf := AllOf(ComponentA, ComponentB)
			anyOf := AnyOf(ComponentC, ComponentD)
			noneOf := NoneOf(ComponentE, ComponentF)

			Convey("AllOf can be printed", func() {
				m := AllOf(allOf, anyOf, noneOf)
				So(m.String(), ShouldEqual, "AllOf(AllOf(0, 1), AnyOf(2, 3), NoneOf(4, 5))")
			})

			Convey("AnyOf can be printed", func() {
				m := AnyOf(allOf, anyOf, noneOf)
				So(m.String(), ShouldEqual, "AnyOf(AllOf(0, 1), AnyOf(2, 3), NoneOf(4, 5))")
			})

			Convey("NoneOf can be printed", func() {
				m := NoneOf(allOf, anyOf, noneOf)
				So(m.String(), ShouldEqual, "NoneOf(AllOf(0, 1), AnyOf(2, 3), NoneOf(4, 5))")
			})
		})
	})
}

func allOfAB() Matcher {
	return AllOf(ComponentA, ComponentB)
}
