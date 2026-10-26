const products = [
  {
    name: 'Pão Francês',
    category: 'pao',
    price: 'R$ 8,50',
    description: 'Crosta dourada e miolo macio, perfeito para qualquer refeição.',
    image:
      'https://th.bing.com/th/id/OIP.0btb0gPa1ohhDwgKaWJesgHaE7?w=261&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
  },
  {
    name: 'Pão de Queijo',
    category: 'pao',
    price: 'R$ 12,90',
    description: 'Quentinho, textura leve e sabor irresistível.',
    image:
      'https://receitadaboa.com.br/wp-content/uploads/2025/01/9915.jpg'
  },
  {
    name: 'Bolo de Chocolate',
    category: 'bolo',
    price: 'R$ 34,90',
    description: 'Cobertura cremosa e massa úmida com sabor intenso.',
    image: 'https://receitatodahora.com.br/wp-content/uploads/2023/06/bolo-de-chocolate-chocolatudo-22-0611-1024x683.jpg'
  },
  {
    name: 'Bolo de Cenoura com Cobertura de Chocolate',
    category: 'bolo',
    price: 'R$ 29,90',
    description: 'Clássico, fofinho e com cobertura de chocolate.',
    image: 'https://guiadacozinha.com.br/wp-content/uploads/2018/08/bolo-de-cenoura-recheado.jpg'
  },
  {
    name: 'Torta de Morango',
    category: 'torta',
    price: 'R$ 42,00',
    description: 'Recheio suave, frutas frescas e massa crocante.',
    image: 'https://receitatodahora.com.br/wp-content/uploads/2025/02/torta-de-morango-3001-1024x683.jpg'
  },
  {
    name: 'Torta de Limão',
    category: 'torta',
    price: 'R$ 38,50',
    description: 'Acre e doce na medida certa para um sabor refrescante.',
    image: 'https://i.pinimg.com/736x/91/f6/aa/91f6aa63984015ec857271de528ef12b.jpg'
  },
  {
    name: 'Panetone Tradicional',
    category: 'panetone',
    price: 'R$ 39,90',
    description: 'Massa leve com frutas cristalizadas e notas de baunilha.',
    image: 'https://th.bing.com/th/id/OIP.AcDO3MQ0rJVeD46O_MEQUwHaDx?w=322&h=178&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
  },
  {
    name: 'Panetone de Nutella',
    category: 'panetone',
    price: 'R$ 44,90',
    description: 'Massa macia recheada com creme de avelã e cobertura de chocolate.',
    image: 'https://maravilhadesabor.com.br/wp-content/uploads/2023/12/Faca-voce-mesmo-seu-Panetone-Trufado-Caseiro-com-Ingredientes-que-voce-tem-em-casa.jpg'
  }
];

const stores = [
  {
    name: 'Paes e Sabores ',
    district: 'Centro',
    city: 'Brasilia',
    address: 'Pistao Sul, 1000 - Asa Sul, Brasília - DF',
    hours: 'Seg a Sáb · 6h às 20h'
  },
 
];

const productGrid = document.getElementById('productGrid');
const productSearch = document.getElementById('productSearch');
const storeSearch = document.getElementById('storeSearch');
const storeList = document.getElementById('storeList');
const filters = document.querySelectorAll('.filter-btn');
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const heroCartBtn = document.getElementById('heroCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const confirmationModal = document.getElementById('confirmationModal');
const confirmationText = document.getElementById('confirmationText');
const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
const confirmCheckoutBtn = document.getElementById('confirmCheckoutBtn');
const printReceiptBtn = document.getElementById('printReceiptBtn');
const receiptItems = document.getElementById('receiptItems');
const receiptCustomerDetails = document.getElementById('receiptCustomerDetails');
const storeSelect = document.getElementById('storeSelect');
const storeSelectLabel = document.getElementById('storeSelectLabel');
const storeSelectionHint = document.getElementById('storeSelectionHint');
const orderModeInputs = document.querySelectorAll('input[name="orderMode"]');
const customerFields = document.getElementById('customerFields');
const customerName = document.getElementById('customerName');
const customerPhone = document.getElementById('customerPhone');
const customerAddress = document.getElementById('customerAddress');
const deliveryAppFields = document.getElementById('deliveryAppFields');
const deliveryAppSelect = document.getElementById('deliveryAppSelect');

const STORAGE_KEY = 'paes-e-sabores-cart';
const ORDER_NUMBERS_STORAGE_KEY = 'paes-e-sabores-order-numbers';
const deliveryApps = ['iFood', 'Rappi', '99Food', 'Uber Eats', 'aiqfome', 'Keeta'];

let activeFilter = 'todos';
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let currentOrderNumber = '';

function getSelectedMode() {
  return document.querySelector('input[name="orderMode"]:checked')?.value || 'retirada';
}

function getOrderModeLabel() {
  const selectedMode = getSelectedMode();

  if (selectedMode === 'motoboy') {
    return 'Motoboy (taxa a combinar)';
  }

  if (selectedMode === 'app') {
    return `App de entrega (${deliveryAppSelect.value || 'não selecionado'})`;
  }

  return 'Retirada';
}

function getSelectedStore() {
  return stores.find((store) => store.name === storeSelect.value) || stores[0];
}

function renderStoreSelect() {
  stores.forEach((store) => {
    const option = document.createElement('option');
    option.value = store.name;
    option.textContent = `${store.name} — ${store.district}, ${store.city} · ${store.address}`;
    storeSelect.append(option);
  });
  updateStoreSelection();
}

function updateStoreSelection() {
  const store = getSelectedStore();
  const isPickup = getSelectedMode() === 'retirada';

  storeSelectLabel.textContent = isPickup ? 'Escolha a loja para retirada' : 'Unidade de atendimento';
  storeSelectionHint.textContent = `${isPickup ? 'Retire seu pedido nesta unidade: ' : 'Endereço da unidade: '}${store.address} · ${store.district}, ${store.city} · ${store.hours}`;
}

function randomIndex(length) {
  const range = 0x100000000;
  const limit = range - (range % length);
  const value = new Uint32Array(1);

  do {
    crypto.getRandomValues(value);
  } while (value[0] >= limit);

  return value[0] % length;
}

function createOrderNumber() {
  try {
    const storedNumbers = JSON.parse(localStorage.getItem(ORDER_NUMBERS_STORAGE_KEY) || '[]');

    if (!Array.isArray(storedNumbers) || storedNumbers.some((number) => typeof number !== 'string')) {
      throw new Error('A lista de números de pedido salva está inválida.');
    }

    const usedNumbers = new Set(storedNumbers);
    const maximumNumbers = 26 ** 2 * 10 ** 6;

    if (usedNumbers.size >= maximumNumbers) {
      throw new Error('Todas as combinações possíveis de números de pedido foram utilizadas.');
    }

    let orderNumber;

    do {
      const letters = String.fromCharCode(65 + randomIndex(26), 65 + randomIndex(26));
      const digits = String(randomIndex(10 ** 6)).padStart(6, '0');
      orderNumber = `${letters}${digits}`;
    } while (usedNumbers.has(orderNumber));

    localStorage.setItem(ORDER_NUMBERS_STORAGE_KEY, JSON.stringify([...usedNumbers, orderNumber]));
    return orderNumber;
  } catch (error) {
    console.error('Não foi possível gerar um número de pedido único.', error);
    alert('Não foi possível gerar um número de pedido. Verifique o armazenamento do navegador e tente novamente.');
    return '';
  }
}

function updateConfirmationText() {
  const orderReference = currentOrderNumber ? `Pedido ${currentOrderNumber} • ` : '';
  const deliveryNote = getSelectedMode() === 'retirada' ? '' : ' • taxa de entrega a confirmar';
  confirmationText.textContent = `${orderReference}${storeSelect.value || 'Padaria Delícia Centro'} • ${getOrderModeLabel()} • Total ${formatCurrency(getCartTotal())}${deliveryNote}`;
}

function populatePrintReceipt() {
  const selectedMode = getSelectedMode();
  const receiptCustomerName = document.getElementById('receiptCustomerName');
  const receiptCustomerPhone = document.getElementById('receiptCustomerPhone');
  const receiptCustomerAddress = document.getElementById('receiptCustomerAddress');

  document.getElementById('receiptOrderNumber').textContent = currentOrderNumber;
  document.getElementById('receiptDate').textContent = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date());
  document.getElementById('receiptStore').textContent = `${getSelectedStore().name} — ${getSelectedStore().address}`;
  document.getElementById('receiptMode').textContent = getOrderModeLabel();
  document.getElementById('receiptTotal').textContent = formatCurrency(getCartTotal());

  const isDelivery = selectedMode !== 'retirada';
  receiptCustomerDetails.hidden = !isDelivery;

  if (isDelivery) {
    receiptCustomerName.textContent = customerName.value.trim();
    receiptCustomerPhone.textContent = customerPhone.value.trim();
    receiptCustomerAddress.textContent = customerAddress.value.trim();
  }

  receiptItems.replaceChildren();

  cart.forEach((item) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const quantityCell = document.createElement('td');
    const totalCell = document.createElement('td');

    nameCell.textContent = item.name;
    quantityCell.textContent = String(item.quantity);
    totalCell.textContent = formatCurrency(item.price * item.quantity);
    row.append(nameCell, quantityCell, totalCell);
    receiptItems.append(row);
  });
}

function renderProducts() {
  const searchTerm = productSearch.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeFilter === 'todos' || product.category === activeFilter;
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  if (!filteredProducts.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>Nenhum produto encontrado.</h3>
        <p>Tente outra busca ou escolha outra categoria.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts
    .map((product) => {
      const imageUrl = product.image || './img/pao frances.jpg';
 
      return `
        <article class="product-card" data-name="${product.name}" data-price="${product.price}" data-image="${imageUrl}">
          <div class="product-image" style="background-image: url('${imageUrl}')"></div>
          <div class="product-meta">
            <span class="product-tag">${product.category}</span>
            <span class="product-price">${product.price}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="card-actions">
            <button type="button" class="small-btn" aria-label="Comprar ${product.name}">Comprar</button>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderStores() {
  const searchTerm = storeSearch.value.trim().toLowerCase();

  const filteredStores = stores.filter((store) => {
    const values = `${store.name} ${store.district} ${store.city} ${store.address}`.toLowerCase();
    return !searchTerm || values.includes(searchTerm);
  });

  if (!filteredStores.length) {
    storeList.innerHTML = `
      <div class="empty-state">
        <p>Nenhuma unidade encontrada no momento.</p>
      </div>
    `;
    return;
  }

  storeList.innerHTML = filteredStores
    .map(
      (store) => `
        <div class="store-item">
          <strong>${store.name}</strong>
          <span>${store.district} · ${store.city}</span>
          <small>${store.address}</small>
          <small>${store.hours}</small>
        </div>
      `
    )
    .join('');
}

function parsePrice(priceText) {
  return Number(priceText.replace('R$ ', '').replace('.', '').replace(',', '.'));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function updateCartView() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartTotal.textContent = formatCurrency(getCartTotal());

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <p>Seu carrinho está vazio. <br />Adicione alguns produtos para continuar.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      const productImage = products.find((product) => product.name === item.name)?.image || './assets/img/pao frances.jpg';

      return `
        <div class="cart-item">
          <div class="cart-item-thumb" style="background-image: url('${productImage}')"></div>
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-meta">${formatCurrency(item.price)} cada</span>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-box">
              <button type="button" class="quantity-btn" data-action="decrease" data-id="${item.id}" aria-label="Diminuir quantidade de ${item.name}">-</button>
              <span>${item.quantity}</span>
              <button type="button" class="quantity-btn" data-action="increase" data-id="${item.id}" aria-label="Aumentar quantidade de ${item.name}">+</button>
            </div>
            <button type="button" class="remove-btn" data-id="${item.id}">Remover</button>
          </div>
        </div>
      `;
    })
    .join('');
}

function addToCart(productName, priceText, image) {
  currentOrderNumber = '';
  const productId = productName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
  const price = parsePrice(priceText);

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price,
      image,
      quantity: 1
    });
  }

  saveCart();
  updateCartView();
  cartPanel.classList.add('open');
}

function changeCartQuantity(productId, delta) {
  const item = cart.find((entry) => entry.id === productId);

  if (!item) return;

  currentOrderNumber = '';
  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== productId);
  }

  saveCart();
  updateCartView();
}

function removeFromCart(productId) {
  currentOrderNumber = '';
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartView();
}

function clearCart() {
  currentOrderNumber = '';
  cart = [];
  saveCart();
  updateCartView();
}

function buildWhatsAppMessage() {
  if (!cart.length) {
    return '';
  }

  const selectedStore = getSelectedStore();
  const selectedMode = getSelectedMode();
  const isDelivery = selectedMode !== 'retirada';

  const itemsText = cart
    .map((item) => `- ${item.name}: ${item.quantity}x (${formatCurrency(item.price * item.quantity)})`)
    .join('\n');

  const intro = isDelivery
    ? 'Olá! Gostaria de fazer o seguinte pedido para entrega:'
    : 'Olá! Gostaria de fazer o seguinte pedido para retirada:';

  const customerDetails = isDelivery
    ? `\n\nDados do cliente:\nNome: ${customerName.value.trim() || 'Não informado'}\nTelefone: ${customerPhone.value.trim() || 'Não informado'}\nEndereço: ${customerAddress.value.trim() || 'Não informado'}`
    : '';
  const deliveryDetails = selectedMode === 'motoboy'
    ? '\nTaxa do motoboy: a confirmar com a padaria.'
    : selectedMode === 'app'
      ? `\nApp escolhido: ${deliveryAppSelect.value}\nA padaria confirmará o pedido e a entrega pelo WhatsApp.`
      : '';

  return encodeURIComponent(
    `Número do pedido: ${currentOrderNumber}\n${intro}\n${itemsText}${customerDetails}\n\nUnidade: ${selectedStore.name}\nEndereço da unidade: ${selectedStore.address} — ${selectedStore.district}, ${selectedStore.city}\nModo: ${getOrderModeLabel()}${deliveryDetails}\nTotal dos produtos: ${formatCurrency(getCartTotal())}${isDelivery ? '\nTaxa de entrega não incluída; confirmar pelo WhatsApp.' : ''}`
  );
}

function openCart() {
  cartPanel.classList.add('open');
}

function closeCart() {
  cartPanel.classList.remove('open');
}

function toggleCustomerFields() {
  const selectedMode = getSelectedMode();
  const isDelivery = selectedMode !== 'retirada';

  document.querySelectorAll('.mode-option').forEach((option) => {
    const input = option.querySelector('input');
    option.classList.toggle('is-selected', input?.checked);
  });

  customerFields.hidden = !isDelivery;
  deliveryAppFields.hidden = selectedMode !== 'app';
  deliveryAppSelect.disabled = selectedMode !== 'app';
  updateStoreSelection();
}

function openConfirmationModal() {
  const message = buildWhatsAppMessage();

  if (!message) {
    alert('Seu carrinho está vazio. Adicione algum produto antes de finalizar o pedido.');
    return;
  }

  const selectedMode = getSelectedMode();

  if (selectedMode !== 'retirada') {
    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();
    const address = customerAddress.value.trim();

    if (!name || !phone || !address) {
      alert('Para entrega, preencha nome, telefone e endereço antes de enviar o pedido.');
      return;
    }
  }

  if (selectedMode === 'app' && !deliveryAppSelect.value) {
    alert('Adicione pelo menos um app à lista de opções no arquivo script.js antes de finalizar o pedido.');
    return;
  }

  currentOrderNumber = currentOrderNumber || createOrderNumber();

  if (!currentOrderNumber) {
    return;
  }

  populatePrintReceipt();
  updateConfirmationText();
  confirmationModal.classList.add('visible');
  confirmationModal.setAttribute('aria-hidden', 'false');
}

function closeConfirmationModal() {
  confirmationModal.classList.remove('visible');
  confirmationModal.setAttribute('aria-hidden', 'true');
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;

    filters.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderProducts();
  });
});

productSearch.addEventListener('input', renderProducts);
storeSearch.addEventListener('input', renderStores);

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.small-btn');

  if (!button) return;

  const card = button.closest('.product-card');
  if (!card) return;

  const name = card.dataset.name;
  const price = card.dataset.price;
  const image = card.dataset.image;

  addToCart(name, price, image);
});

cartItems.addEventListener('click', (event) => {
  const target = event.target;
  const quantityButton = target.closest('.quantity-btn');
  const removeButton = target.closest('.remove-btn');

  if (quantityButton) {
    changeCartQuantity(quantityButton.dataset.id, quantityButton.dataset.action === 'increase' ? 1 : -1);
    return;
  }

  if (removeButton) {
    removeFromCart(removeButton.dataset.id);
  }
});

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
heroCartBtn.addEventListener('click', openCart);

checkoutBtn.addEventListener('click', openConfirmationModal);
printReceiptBtn.addEventListener('click', () => {
  populatePrintReceipt();
  window.print();
});
clearCartBtn.addEventListener('click', () => {
  clearCart();
  closeCart();
});

confirmCheckoutBtn.addEventListener('click', () => {
  const message = buildWhatsAppMessage();
  if (!message) {
    closeConfirmationModal();
    return;
  }

  const whatsappUrl = `https://wa.me/5561994284704?text=${message}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  currentOrderNumber = '';
  closeConfirmationModal();
  closeCart();
});

cancelCheckoutBtn.addEventListener('click', closeConfirmationModal);
confirmationModal.addEventListener('click', (event) => {
  if (event.target === confirmationModal) {
    closeConfirmationModal();
  }
});
orderModeInputs.forEach((input) => {
  input.addEventListener('change', () => {
    toggleCustomerFields();

    if (cart.length) {
      const message = buildWhatsAppMessage();
      if (message) {
        updateConfirmationText();
      }
    }
  });
});

deliveryApps.forEach((appName) => {
  const option = document.createElement('option');
  option.value = appName;
  option.textContent = appName;
  deliveryAppSelect.append(option);
});

storeSelect.addEventListener('change', updateStoreSelection);
customerFields.addEventListener('input', updateConfirmationText);
deliveryAppSelect.addEventListener('change', updateConfirmationText);

renderProducts();
renderStores();
renderStoreSelect();
updateCartView();
toggleCustomerFields();
