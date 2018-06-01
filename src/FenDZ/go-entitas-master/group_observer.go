package entitas

type ObserverEvent uint

const (
	ObserverEntityAdded ObserverEvent = iota
	ObserverEntityRemoved
	ObserverEntityAddedOrRemoved
)

type GroupObserver interface {
	CollectedEntities() []Entity
	Activate()
	Deactivate()
	ClearCollectedEntities()
}

type groupObserver struct {
	entities map[Entity]struct{}
	active   bool
}

func NewGroupObserver(group Group, event ObserverEvent) *groupObserver {
	observer := &groupObserver{
		entities: make(map[Entity]struct{}),
		active:   true,
	}

	callback := func(group Group, entity Entity) {
		addEntity(observer, group, entity)
	}

	switch event {
	case ObserverEntityAdded:
		group.AddCallback(EntityAdded, callback)
	case ObserverEntityRemoved:
		group.AddCallback(EntityRemoved, callback)
	case ObserverEntityAddedOrRemoved:
		group.AddCallback(EntityAdded, callback)
		group.AddCallback(EntityRemoved, callback)
	}

	return observer
}

func (observer *groupObserver) CollectedEntities() []Entity {
	entities := make([]Entity, len(observer.entities))

	i := 0

	for entity, _ := range observer.entities {
		entities[i] = entity
		i++
	}

	return entities
}

func (observer *groupObserver) Activate() {
	observer.active = true
}

func (observer *groupObserver) Deactivate() {
	observer.active = false
	observer.ClearCollectedEntities()
}

func (observer *groupObserver) ClearCollectedEntities() {
	observer.entities = make(map[Entity]struct{})
}

func addEntity(observer *groupObserver, group Group, entity Entity) {
	if observer.active {
		observer.entities[entity] = struct{}{}
	}
}
