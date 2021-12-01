function redirect() {
  const email = document.querySelector('#inp').value

  function validaEmail() {
    if (email.length < 3 && email.search('@') == -1) {
      document.querySelector('#msgemail').innerHTML = 'email errado'
      alert('Atençao! Email invalido.')
    } else {
      //redirect()
    }
  }
  validaEmail()
  window.location.href = './page2.html'
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

function getpersonagem() {
  function display() {
    const card1 = document.querySelector('#card')
    const card2 = document.querySelector('#card2')
    card1.style.display = 'none'
    card2.style.display = 'block'
  }

  console.log('proximo')
  const personag = document.querySelector('#pers').value
  fetch(`https://swapi.dev/api/people/`)
    .then(resp => resp.json())
    .then(async function (data) {
      console.log(data)
      const listPerson = await data.results
      console.log(listPerson)
      console.log(personag)
      listPerson.forEach(function (element) {
        if (element.name == personag) {
          console.log(element)
          urlperson = element.url
          display()
          console.log(urlperson)
          requer()
          //window.location.href = '../resultado.html'
        } else {
          console.log('personagem não encontrado')
        }
      })
    })
}

function requer() {
  console.log(urlperson)
  var filmes = document.querySelector('.itemfilmes')
  var naves = document.querySelector('#naves')
  var veiculos = document.querySelector('#veiculos')
  var especies = document.querySelector('#especie')
  var planeta = document.querySelector('#planeta')
  console.log('teste')
  const result = fetch(urlperson)
    .then(resp => resp.json())
    .then(async function (data) {
      console.log(data)
      data.films.forEach(async function (element) {
        const listfilm = await fetch(element)
          .then(resp => resp.json())
          .then(function (data1) {
            //console.log(data1.title)

            filmes.innerHTML += `<li>${data1.title}</li>`
          })
        const result1 = listfilm
        //console.log(result1)
        return data
      })

      data.starships.forEach(async function (element) {
        const listfilm = await fetch(element)
          .then(resp => resp.json())
          .then(function (data1) {
            naves.innerHTML += data1.name + '<br>'
          })
        const result1 = await listfilm
        // console.log(result1)
        return data
      })

      data.vehicles.forEach(async function (element) {
        const listfilm = await fetch(element)
          .then(resp => resp.json())
          .then(function (data1) {
            veiculos.innerHTML += data1.name + '<br>'
          })
        const result1 = await listfilm
        console.log(result1)
        return data
      })

      data.species.forEach(async function (element) {
        const listfilm = await fetch(element)
          .then(resp => resp.json())
          .then(function (data1) {
            especies.innerHTML += data1.name + '<br>'
          })
        const result1 = await listfilm
        console.log(result1)
        return data
      })

      data.homeworld.forEach(async function (element) {
        const listfilm = await fetch(element)
          .then(resp => resp.json())
          .then(function (data1) {
            planeta.innerHTML += data1.homeworld + '<br>'
          })
        const result1 = await listfilm
        console.log(result1)
        return data
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  const data = result
  // console.log(data)

  // const listaFilme = data.films
  //dadosFilme(listaFilme)
}
//requer()
