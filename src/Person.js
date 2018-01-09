import { Button } from './Button'

export class Person {
  constructor(props) {
    this.props = props
  }

  render() {
    const onClick = () => alert('HELLO!')
    const { person } = this.props
    return `
     <div class="person">
        <h2>
            ${person.name}
        </h2>
        <p class="location">${person.location}</p>
        <p class="bio">${person.bio}</p>
        ${new Button({ label: 'Click me', onClick }).render()}
     </div>
    `
  }
}



