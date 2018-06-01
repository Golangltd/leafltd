package entitas

import "fmt"

type ComponentType uint16

func (c ComponentType) Matches(e Entity) bool {
	return e.HasComponent(c)
}

func (c ComponentType) Hash() MatcherHash {
	return MatcherHash(uint16(c) * componentHashFactor)
}

func (c ComponentType) ComponentTypes() []ComponentType {
	return []ComponentType{c}
}

func (c ComponentType) String() string {
	return fmt.Sprintf("%d", c)
}

func (c ComponentType) Equals(m Matcher) bool {
	types := m.ComponentTypes()
	if len(types) == 1 {
		return types[0] == c
	}
	return false
}

type TypesByType []ComponentType

func (ts TypesByType) Len() int           { return len(ts) }
func (ts TypesByType) Swap(i, j int)      { ts[i], ts[j] = ts[j], ts[i] }
func (ts TypesByType) Less(i, j int) bool { return ts[i] < ts[j] }

type Component interface {
	Type() ComponentType
}

type ComponentsByType []Component

func (t ComponentsByType) Len() int           { return len(t) }
func (t ComponentsByType) Swap(i, j int)      { t[i], t[j] = t[j], t[i] }
func (t ComponentsByType) Less(i, j int) bool { return t[i].Type() < t[j].Type() }
