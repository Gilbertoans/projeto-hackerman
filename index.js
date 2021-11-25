function validaEmail() {
  const email = document.querySelector('#inp').value
  function redirect() {
    window.location.href = '../page2.html'
  }
  if (email.length < 3 && email.search('@') == -1) {
    document.querySelector('#msgemail').innerHTML = 'email errado'
  } else {
    redirect()
  }
}

function validaPersonagem() {
  const personagem = document.querySelector('#pers').value

  function redirect2() {
    window.location.href = '../resultado.html'
  }
  if (personagem != '') {
    console.log('teste' + personagem)
    redirect2()
  } else {
    document.querySelector('#msgerro').innerHTML = 'Personagem Inválido'
  }
}
var urlperson = ''

async function getpersonagem() {
  const personag = document.querySelector('#pers').value
  const result = await fetch('https://swapi.dev/api/people/')
    .then(resp => resp.json())
    .then(async function (data) {
      console.log(data)
      const person = await data.results
      //console.log(person)
      person.forEach(function (element) {
        if (element.name == personag) {
          console.log(element)
          urlperson = data.results.homeworld
          console.log(urlperson)
          window.location.href = '../resultado.html'
          requer()
        } else {
          console.log('personagem não encontrado')
        }
      })
    })
}

var filmes = document.querySelector('#filmes')
var naves = document.querySelector('#naves')

async function requer() {
  console.log('teste')
  const result = await fetch(urlperson)
    .then(resp => resp.json())
    .then(async function (data) {
      console.log(data)
      data.films.forEach(async function (element) {
        const listfilm = await fetch(element)
          .then(resp => resp.json())
          .then(function (data1) {
            filmes.innerHTML += data1.title + '<br>'
          })
        const result1 = await listfilm
        console.log(result1)
        return data
      })

      data.starships.forEach(async function (element) {
        const listfilm = await fetch(element)
          .then(resp => resp.json())
          .then(function (data1) {
            naves.innerHTML += data1.name + '<br>'
          })
        const result1 = await listfilm
        console.log(result1)
        return data
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  const data = await result
  console.log(data)

  const listaFilme = data.films
  //dadosFilme(listaFilme)
}
//requer()
