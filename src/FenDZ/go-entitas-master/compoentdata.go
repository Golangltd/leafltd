package entitas

// Component index
// 组件--也就相当于数据块
// 会根据类型经行操作
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
