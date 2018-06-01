package entitas

import (
	"fmt"
	"sort"
	"strings"
)

const (
	componentHashFactor uint16 = 647
	allHashFactor              = 653
	anyHashFactor              = 659
	noneHashFactor             = 661
)

type Matcher interface {
	Matches(entity Entity) bool
	Hash() MatcherHash
	ComponentTypes() []ComponentType
	Equals(m Matcher) bool
	String() string
}

type MatcherHash uint

// --- BaseMatcher ------------------------------------------------------------

type BaseMatcher struct {
	matchers map[MatcherHash]Matcher
	hash     MatcherHash
}

func newBaseMatcher(ms ...Matcher) BaseMatcher {
	b := BaseMatcher{matchers: make(map[MatcherHash]Matcher)}
	for _, m := range ms {
		b.matchers[m.Hash()] = m
	}
	return b
}

func (b *BaseMatcher) Hash() MatcherHash {
	return b.hash
}

func (b *BaseMatcher) ComponentTypes() []ComponentType {
	mtype := make(map[ComponentType]struct{})
	for _, m := range b.matchers {
		for _, t := range m.ComponentTypes() {
			mtype[t] = struct{}{}
		}
	}
	types := make([]ComponentType, 0)
	for t := range mtype {
		types = append(types, t)
	}
	return types
}

// --- AllOf ------------------------------------------------------------------

type AllMatcher struct{ BaseMatcher }

func AllOf(ms ...Matcher) Matcher {
	b := newBaseMatcher(ms...)
	b.hash = Hash(allHashFactor, ms...)
	return &AllMatcher{b}
}

func (a *AllMatcher) Matches(e Entity) bool {
	for _, m := range a.matchers {
		if !m.Matches(e) {
			return false
		}
	}
	return true
}

func (a *AllMatcher) Equals(m Matcher) bool {
	switch m.(type) {
	case *AllMatcher:
		for h, m := range m.(*AllMatcher).matchers {
			if am, ok := a.matchers[h]; ok {
				if !m.Equals(am) {
					return false
				}
			} else {
				return false
			}
		}
		return true
	default:
		return false
	}
}

func (a *AllMatcher) String() string {
	return fmt.Sprintf("AllOf(%v)", print(a.matchers))
}

// --- AnyOf ------------------------------------------------------------------

type AnyMatcher struct{ BaseMatcher }

func AnyOf(ms ...Matcher) Matcher {
	b := newBaseMatcher(ms...)
	b.hash = Hash(anyHashFactor, ms...)
	return &AnyMatcher{b}
}

func (a *AnyMatcher) Matches(e Entity) bool {
	for _, m := range a.matchers {
		if m.Matches(e) {
			return true
		}
	}
	return false
}

func (a *AnyMatcher) Equals(m Matcher) bool {
	return false // TODO: Implement
}

func (a *AnyMatcher) String() string {
	return fmt.Sprintf("AnyOf(%v)", print(a.matchers))
}

// --- NoneOf -----------------------------------------------------------------

type NoneMatcher struct{ BaseMatcher }

func NoneOf(ms ...Matcher) Matcher {
	b := newBaseMatcher(ms...)
	b.hash = Hash(noneHashFactor, ms...)
	return &NoneMatcher{b}
}

func (n *NoneMatcher) Matches(e Entity) bool {
	for _, m := range n.matchers {
		if m.Matches(e) {
			return false
		}
	}
	return true
}

func (n *NoneMatcher) Equals(m Matcher) bool {
	return false // TODO: Implement
}

func (n *NoneMatcher) String() string {
	return fmt.Sprintf("NoneOf(%v)", print(n.matchers))
}

// --- Utilities --------------------------------------------------------------

func Hash(factor uint, ms ...Matcher) MatcherHash {
	var hash uint
	for _, m := range ms {
		hash ^= uint(m.Hash())
	}
	hash ^= uint(len(ms)) * factor
	return MatcherHash(hash)
}

func print(matchers map[MatcherHash]Matcher) string {
	ms := make([]string, 0)
	for _, m := range matchers {
		ms = append(ms, m.String())
	}
	sort.Strings(ms)
	return strings.Join(ms, ", ")
}
