let fruits = [
{id: 1, title: 'Apple', price: 20, img: 'https://media.istockphoto.com/photos/red-apples-picture-id1141708425'},
{id: 2, title: 'Orange', price: 30, img: 'https://media.istockphoto.com/photos/whole-cross-section-and-quarter-of-fresh-organic-navel-orange-with-picture-id1227301369?b=1&k=20&m=1227301369&s=170667a&w=0&h=7WdK1RQTLuCn5tuNe25Z999THYzj8yijmk0MaRE-SD0='},
{id: 3, title: 'Mango', price: 40, img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg'}
]

const toHTML = fruit => `
  <div class="col">
    <div class="card">
      <img class="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Look price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
      </div>
    </div>
  </div>
`

function render() {
  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}
render()

const priceModal = $.modal({
  title: 'The price of the product',
  closable: true,
  width: '400px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
      priceModal.close()
    }}
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id == id)
  
  if(btnType == 'price') {
    priceModal.setContent(`
      <p>Price on ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `)
    priceModal.open()
  }else if (btnType == 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `<p>You remove the fruit: <strong>${fruit.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== id)
      render()
    }).catch(() => {
      console.log('Cancel')
    })
  }
})
