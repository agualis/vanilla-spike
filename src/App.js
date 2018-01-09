import { Person } from './Person'

export class App {
  render(root) {
    const person = { name: 'Michael', location: 'Zaragoza', bio: 'A very interesting person' }
    root.innerHTML = new Person({ person }).render()
  }
}



