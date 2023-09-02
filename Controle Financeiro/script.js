// shift + alt + seta para baixo: duplicar a linha

const transacaoUl = document.querySelector('#transacoes')
const exibindoReceita = document.querySelector('#dinheiro-plus')
const exibindoDespesa = document.querySelector('#dinheiro-menos')  //Inserindo informações no DOM
const exibindoTotal = document.querySelector('#balanco')

const form = document.querySelector('#form')
const nomeTransacaoEntrada = document.querySelector('#text')
const valorTransacaoEntrada = document.querySelector('#quantia')


// console.log(form)
//console.log({ exibindoReceita, exibindoDespesa, exibindoTotal  }) Testando como objeto

// let transacao = [
//   { id: 1, name: 'Bolo de brigadeiro', quantia: -20 },
//   { id: 2, name: 'Salário', quantia: 300 },
//   { id: 3, name: 'Torta de frango', quantia: -10 },
//   { id: 4, name: 'Violão', quantia: 150 }
// ]

//Armazenamento das Transações Realizadas
const localArmazenamentoTransacoes = JSON.parse(localStorage
    .getItem('transacao'))
let transacao = localStorage
    .getItem('transacao') !== null ? localArmazenamentoTransacoes : []

//Remoção de Transações, que tem o ID diferente da transação que foi clicado. 
const removeTransacao = ID => {
  transacao = transacao.filter(transacao => 
    transacao.id !== ID)
    atualizarLocalArmazenamento()
  inicio()
  
}

const addTransacoesNoDom = transacao => {
  const operacao = transacao.quantia < 0 ? '-' : '+'
  const CSSClass = transacao.quantia < 0 ? 'menos' : 'plus'
  const valorSemOperacao = Math.abs(transacao.quantia)
  const li = document.createElement('li') //Criando um novo elemento HTML

  li.classList.add(CSSClass)
  li.innerHTML = `
    ${transacao.name} 
    <span>${operacao} R$ ${valorSemOperacao}</span>
    <button class="delete-btn" onClick="removeTransacao(${transacao.id})">
    x
    </button>
  `
 //transacaoUl.innerHTML = li ===> [object HTMLLIElement]
    transacaoUl.prepend(li)
 
}

const atualizaValorSaldo = () => {
  const transacaoQuantia = transacao
    .map(transacao => transacao.quantia)
  const total = transacaoQuantia
    .reduce((accumulator, transacao) => accumulator + transacao, 0)
    .toFixed(2)
  const receita = transacaoQuantia
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)                     
  const despesas = Math.abs(transacaoQuantia
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2) 
    
    //Exibir saldo, receita e despesa total na tela
    exibindoTotal.textContent = `R$ ${total}`
    exibindoReceita.textContent = `R$ ${receita}`
    exibindoDespesa.textContent = `R$ ${despesas}`

  //console.log(despesas)
}





/* Função que executa o preenchimento das informações do estado da aplicação, quando a pagina for carregada. 
Add as transações no DOM. 
*/
const inicio = () => {
  transacaoUl.innerHTML = ''
  transacao.forEach(addTransacoesNoDom)
  atualizaValorSaldo()
}

inicio()

//Função para adicionar Transação no Local Storage
const atualizarLocalArmazenamento = () =>  {
  localStorage.setItem('transacao', JSON.stringify(transacao));
}

//Gerando os ids automaticamente de forma aleatoria
const geradorID = () => Math.round(Math.random() * 1000)

const adicionarTransacaoArray = (transacaoNome, transacaoQuantia) => {
  transacao.push({ 
    id: geradorID(), 
    name: transacaoNome, 
    quantia: Number(transacaoQuantia) 
  })
}

//Escutando os eventos - Função que faz o envio do formulário
const enviarFormulario =  event => {
  event.preventDefault()

  const transacaoNome = nomeTransacaoEntrada.value.trim()
  const transacaoQuantia = valorTransacaoEntrada.value.trim()

  //Caso um dos inputs não estejam preenchidos será exibido uma mensagem
  if (transacaoNome === '' || transacaoQuantia === '') {
    alert('Por favor, preencha tanto o nome quanto o valor da transação')
    return
  }

  adicionarTransacaoArray(transacaoNome, transacaoQuantia)
  inicio()
  atualizarLocalArmazenamento()

  //Limpando os inputs do nome e valor da transação
  nomeTransacaoEntrada.value = ''
  valorTransacaoEntrada.value = ''

}

form.addEventListener('submit', enviarFormulario)



// addTransacoesNoDom(transacao[2])
// addTransacoesNoDom(transacao[1])













//ClaudiaAmora1820

//sodexo: Claudi@Amor@1820