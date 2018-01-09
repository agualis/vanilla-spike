export class Button {
  constructor(props) {
    this.props = props
  }

  render() {
    const { label, onClick } = this.props
    window.onClick = onClick
    return `
     <button class='button' onclick="onClick()">${label}</button>
    `
  }
}



