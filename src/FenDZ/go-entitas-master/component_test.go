package entitas

import (
	"sort"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

// Component index
// 组件--也就相当于数据块
const (
	ComponentA ComponentType = iota
	ComponentB
	ComponentC
	ComponentD
	ComponentE
	ComponentF
	NumComponents
)

// 数据快的解释
// --- A ----------------------------------------------------------------------

type componentA struct {
	value int
}

func NewComponentA(value int) Component    { return &componentA{value: value} }
func (c1 *componentA) Type() ComponentType { return ComponentA }
func (c1 *componentA) String() string      { return "A" }

// --- B ----------------------------------------------------------------------

type componentB struct{ value float32 }

func NewComponentB(value float32) Component { return &componentB{value: value} }
func (c2 *componentB) Type() ComponentType  { return ComponentB }
func (c2 *componentB) String() string       { return "B" }

// --- C ----------------------------------------------------------------------

type componentC struct{}

func NewComponentC() Component            { return &componentC{} }
func (c *componentC) Type() ComponentType { return ComponentC }

// --- D ----------------------------------------------------------------------

type componentD struct{}

func NewComponentD() Component            { return &componentD{} }
func (d *componentD) Type() ComponentType { return ComponentD }

// --- E ----------------------------------------------------------------------

type componentE struct{}

func NewComponentE() Component            { return &componentE{} }
func (e *componentE) Type() ComponentType { return ComponentE }

// --- F ----------------------------------------------------------------------

type componentF struct{}

func NewComponentF() Component            { return &componentF{} }
func (f *componentF) Type() ComponentType { return ComponentF }

// --- Tests ------------------------------------------------------------------

func TestComponentSorting(t *testing.T) {
	Convey("Given components and a component list", t, func() {
		c1 := NewComponentA(1)
		c2 := NewComponentB(0.0)
		components := []Component{c2, c1}

		Convey("It should be sortable by type", func() {
			sort.Sort(ComponentsByType(components))
			So(components, ShouldResemble, []Component{c1, c2})
		})

	})
}
