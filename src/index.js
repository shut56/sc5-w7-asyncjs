import axios from 'axios'

const pokeList = axios('https://pokeapi.co/api/v2/pokemon')
  .then(({ data }) => data)
  .then((list) => { 
    return list.results
  })
  .then((results) => results.map((pokemonObj) => {
    return pokemonObj
  }))
  .catch((err) => console.log(err))

const result = pokeList
  .then((listOfPokeObj) => {
    return Promise.all(listOfPokeObj.map((obj) => {
      return axios(obj.url)
        .then(({ data }) => {
          return {
            ...obj,
            properties: data,
            image: data.sprites.front_default
          }
        })
    }))
  })
  .then((dom) => {
    dom.forEach((element) => {
      const root = document.querySelector('#app')
      root.style="display: flex; flex-direction: row; flex-wrap: wrap;"
      const parent = document.createElement('div')
      parent.setAttribute('id', element.properties.id)
      root.appendChild(parent)
      const name = document.createElement('div')
      name.textContent = element.name
      parent.appendChild(name)
      const divImg = document.createElement('div')
      const img = document.createElement('img')
      img.setAttribute('src', element.image)
      img.setAttribute('alt', element.name)
      divImg.appendChild(img)
      parent.appendChild(divImg)
    })
    return dom
  })
  .catch((err) => console.log(err))


// console.log('result: ', result.then((r) => console.log('FINAL: ', r)))

// Promise.all()
// [Promise {}, Promise{}, Promise{}] -> array with promises
// Promise ([data1, data2, data3]) - > promise with array of data

/*
Task 1
Массив имен первых 20 покемонов.

Task 2
Массив объектов с полями: name, url, properties.
В поле properties записываются данные полученные из URL.
[
  {
    name: 'bulba',
    url: 'https://pokeapi.co/api/v2/pokemon/1',
    properties: {
      abilities: Array(2)
      base_experience: 64
      forms: Array(1)
      game_indices: Array(20)
      ...
    }
  },
  ...
]

Task 3
Добавить в каждый объект уже созданного массива покемонов новое поле - image.
Поле image должно содержать ссылку на картинку 
из поля properties.sprites.front_default

<div id={pokemon.id}>
  <div>{name}</div>
  <div><img src={url} alt={name} /></div>
</div>
*/

const bulbasaur = axios('https://pokeapi.co/api/v2/pokemon/1')
  .then(({ data }) => data)
  .then((poke) => {
    console.log(poke)
    return poke
  })
  .catch((err) => console.log(err))

console.log('bulbasaur: ', bulbasaur)

const location = bulbasaur
  .then((bulbaObj) => {
    return axios(bulbaObj.location_area_encounters)
      .then(({ data }) => {
        return { ...bulbaObj, location_area_encounters: data }
      })
  })

const fullBulbasaur = location

console.log(fullBulbasaur.then((r) => console.log(r)))
