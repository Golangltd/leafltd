package entitas

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func TestGroupObserver(t *testing.T) {

	Convey("Given a pool, group & new group observer", t, func() {
		pool := NewPool(NumComponents, 0)
		group := pool.Group(AllOf(ComponentA))

		Convey("When observing with eventType ObserverEntityAdded", func() {
			observer := NewGroupObserver(group, ObserverEntityAdded)

			Convey("It returns collected entities", func() {
				entity := pool.CreateEntity(NewComponentA(1))

				So(observer.CollectedEntities(), ShouldResemble, []Entity{entity})
			})

			Convey("It only returns matching collected entities", func() {
				entityA := pool.CreateEntity()
				entityA.AddComponent(NewComponentA(1))
				entityB := pool.CreateEntity()
				entityB.AddComponent(NewComponentB(2.0))

				So(observer.CollectedEntities(), ShouldResemble, []Entity{entityA})
			})

			Convey("It collects entites only once", func() {
				entity := pool.CreateEntity()
				entity.AddComponent(NewComponentA(1))
				entity.RemoveComponent(ComponentA)
				entity.AddComponent(NewComponentA(1))

				So(observer.CollectedEntities(), ShouldResemble, []Entity{entity})
			})

			Convey("It returns empty list when no entities were collected", func() {
				So(observer.CollectedEntities(), ShouldBeEmpty)
			})

			Convey("It clears collected entities on deactivation", func() {
				pool.CreateEntity(NewComponentA(1))

				observer.Deactivate()

				So(observer.CollectedEntities(), ShouldBeEmpty)
			})

			Convey("It doesn't collect entities when deactivated", func() {
				observer.Deactivate()

				pool.CreateEntity(NewComponentA(1))

				So(observer.CollectedEntities(), ShouldBeEmpty)
			})

			Convey("It continues collecting when activated", func() {
				observer.Deactivate()

				pool.CreateEntity(NewComponentA(1))

				observer.Activate()

				entity := pool.CreateEntity(NewComponentA(1))

				So(observer.CollectedEntities(), ShouldResemble, []Entity{entity})
			})

			Convey("It clears collected entites", func() {
				pool.CreateEntity(NewComponentA(1))

				observer.ClearCollectedEntities()

				So(observer.CollectedEntities(), ShouldBeEmpty)
			})
		})

		Convey("When observing with eventType ObserverEntityRemoved", func() {
			observer := NewGroupObserver(group, ObserverEntityRemoved)

			Convey("It returns collected entities", func() {
				entity := pool.CreateEntity(NewComponentA(1))

				So(observer.CollectedEntities(), ShouldBeEmpty)

				entity.RemoveComponent(ComponentA)

				So(observer.CollectedEntities(), ShouldResemble, []Entity{entity})
			})
		})

		Convey("When observing with eventType ObserverEntityAddedOrRemoved", func() {
			observer := NewGroupObserver(group, ObserverEntityAddedOrRemoved)

			Convey("It returns collected entities", func() {
				entity := pool.CreateEntity(NewComponentA(1))

				So(observer.CollectedEntities(), ShouldResemble, []Entity{entity})

				observer.ClearCollectedEntities()
				entity.RemoveComponent(ComponentA)

				So(observer.CollectedEntities(), ShouldResemble, []Entity{entity})
			})
		})

		Convey("When observing with 2 Groups of different Component types", func() {
			_ = pool.Group(AllOf(ComponentB))
			observer := NewGroupObserver(group, ObserverEntityAdded)

			Convey("It should only collect entities from the observed group", func() {
				entity := pool.CreateEntity()
				entity.AddComponent(NewComponentA(1))
				entity.AddComponent(NewComponentB(1.0))

				observer.ClearCollectedEntities()

				entity.ReplaceComponent(NewComponentB(1.5))

				So(observer.CollectedEntities(), ShouldBeEmpty)
			})
		})
	})
}
