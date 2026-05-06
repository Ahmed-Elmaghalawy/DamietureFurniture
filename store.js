document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  if (!productsGrid) return; // Only run on store page

  // Mock Products Data
  const products = [
    {
      id: 1,
      nameEn: 'Luxury Salon Sofa',
      nameAr: 'أريكة صالون فاخرة',
      category: 'salon',
      price: 18000,
      image: '_furniture_pictures/salon/file_1.jpg',
      featured: true,
      whatsappMsg: 'I am interested in the Luxury Salon Sofa'
    },
    {
      id: 2,
      nameEn: 'Modern Dining Set',
      nameAr: 'طقم طعام مودرن',
      category: 'dinning',
      price: 12000,
      image: '_furniture_pictures/dinning/file_1.jpg',
      featured: true,
      whatsappMsg: 'I am interested in the Modern Dining Set'
    },
    {
      id: 3,
      nameEn: 'Royal Bedroom Suite',
      nameAr: 'جناح غرفة نوم ملكي',
      category: 'bedrooms',
      price: 25000,
      image: '_furniture_pictures/bedrooms/file_1.jpg',
      featured: true,
      whatsappMsg: 'I am interested in the Royal Bedroom Suite'
    },
    {
      id: 4,
      nameEn: 'Sleek TV Unit',
      nameAr: 'وحدة تلفاز أنيقة',
      category: 'tv_tables',
      price: 4500,
      image: '_furniture_pictures/tv_tables/file_1.jpg',
      featured: false,
      whatsappMsg: 'I am interested in the Sleek TV Unit'
    },
    {
      id: 5,
      nameEn: 'Classic Shoe Cabinet',
      nameAr: 'خزانة أحذية كلاسيكية',
      category: 'shoe_cabinets',
      price: 3200,
      image: '_furniture_pictures/shoe_cabinets/file_1.jpg',
      featured: false,
      whatsappMsg: 'I am interested in the Classic Shoe Cabinet'
    },
    {
      id: 6,
      nameEn: 'Kids Bunk Bed',
      nameAr: 'سرير أطفال طابقين',
      category: 'children',
      price: 8500,
      image: '_furniture_pictures/children/file_1.jpg',
      featured: true,
      whatsappMsg: 'I am interested in the Kids Bunk Bed'
    },
    // Adding some extra variants
    {
      id: 7,
      nameEn: 'Velvet Salon Armchair',
      nameAr: 'كرسي صالون مخملي',
      category: 'salon',
      price: 5500,
      image: '_furniture_pictures/salon/file_1.jpg',
      featured: false,
      whatsappMsg: 'I am interested in the Velvet Salon Armchair'
    },
    {
      id: 8,
      nameEn: 'Wooden Dining Table',
      nameAr: 'طاولة طعام خشبية',
      category: 'dinning',
      price: 9000,
      image: '_furniture_pictures/dinning/file_1.jpg',
      featured: false,
      whatsappMsg: 'I am interested in the Wooden Dining Table'
    }
  ];

  let currentFilters = {
    search: '',
    category: 'all',
    price: 'all',
    sort: 'featured'
  };

  const WHATSAPP_NUMBER = '201000806060';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-EG').format(price) + ' EGP';
  };

  const getFilteredProducts = () => {
    return products.filter(product => {
      // Search
      const searchMatch = 
        product.nameEn.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        product.nameAr.toLowerCase().includes(currentFilters.search.toLowerCase());
      
      // Category
      const categoryMatch = currentFilters.category === 'all' || product.category === currentFilters.category;
      
      // Price
      let priceMatch = true;
      if (currentFilters.price === 'budget') priceMatch = product.price < 5000;
      else if (currentFilters.price === 'mid') priceMatch = product.price >= 5000 && product.price <= 15000;
      else if (currentFilters.price === 'premium') priceMatch = product.price > 15000;

      return searchMatch && categoryMatch && priceMatch;
    }).sort((a, b) => {
      // Sort
      if (currentFilters.sort === 'price-low') return a.price - b.price;
      if (currentFilters.sort === 'price-high') return b.price - a.price;
      if (currentFilters.sort === 'name') return a.nameEn.localeCompare(b.nameEn);
      // default 'featured'
      if (currentFilters.sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });
  };

  const renderProducts = () => {
    const currentLang = document.body.getAttribute('data-lang') || 'en';
    const filteredProducts = getFilteredProducts();
    
    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="col-span-full text-center py-12">
          <p class="text-lg text-slate-500 dark:text-slate-400" data-en="No products found matching your criteria." data-ar="لم يتم العثور على منتجات تطابق معاييرك.">
            ${currentLang === 'en' ? 'No products found matching your criteria.' : 'لم يتم العثور على منتجات تطابق معاييرك.'}
          </p>
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    filteredProducts.forEach(product => {
      const name = currentLang === 'en' ? product.nameEn : product.nameAr;
      const encodedMsg = encodeURIComponent(product.whatsappMsg + ` (ID: ${product.id})`);
      const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      const card = document.createElement('div');
      card.className = 'glass-card overflow-hidden group flex flex-col fade-in-up';
      card.innerHTML = `
        <div class="relative h-64 overflow-hidden">
          <img src="${product.image}" alt="${product.nameEn}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ${product.featured ? `
            <div class="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              <span data-en="Featured" data-ar="مميز">${currentLang === 'en' ? 'Featured' : 'مميز'}</span>
            </div>
          ` : ''}
          <div class="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            ${formatPrice(product.price)}
          </div>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <p class="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">${product.category.replace('_', ' ')}</p>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4" data-en="${product.nameEn}" data-ar="${product.nameAr}">${name}</h3>
          
          <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50">
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full glass-button-primary bg-green-600 hover:bg-green-700 shadow-green-600/30">
              <i class="fab fa-whatsapp text-lg"></i>
              <span data-en="Inquire Now" data-ar="استفسر الآن">${currentLang === 'en' ? 'Inquire Now' : 'استفسر الآن'}</span>
            </a>
          </div>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    if (loadMoreBtn) {
      // In a real app with pagination, check if more products exist
      loadMoreBtn.style.display = 'none'; // hiding for now since all mock products are rendered
    }
  };

  // Set up dropdowns behavior
  const setupDropdown = (btnId, dropdownId, filterKey, updateBtnText = true) => {
    const btn = document.getElementById(btnId);
    const dropdown = document.getElementById(dropdownId);
    if (!btn || !dropdown) return;

    // Toggle dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close others
      document.querySelectorAll('[id$="Dropdown"]').forEach(d => {
        if (d.id !== dropdownId) {
          d.classList.remove('opacity-100', 'visible');
          d.classList.add('opacity-0', 'invisible');
        }
      });
      dropdown.classList.toggle('opacity-0');
      dropdown.classList.toggle('invisible');
      dropdown.classList.toggle('opacity-100');
      dropdown.classList.toggle('visible');
    });

    // Handle clicks
    const options = dropdown.querySelectorAll('button');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        currentFilters[filterKey] = opt.getAttribute(`data-${filterKey}`);
        
        if (updateBtnText) {
          const btnSpan = btn.querySelector('span');
          btnSpan.setAttribute('data-en', opt.getAttribute('data-en'));
          btnSpan.setAttribute('data-ar', opt.getAttribute('data-ar'));
          const lang = document.body.getAttribute('data-lang') || 'en';
          btnSpan.textContent = opt.getAttribute(`data-${lang}`);
        }

        renderProducts();
        dropdown.classList.add('opacity-0', 'invisible');
        dropdown.classList.remove('opacity-100', 'visible');
      });
    });
  };

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('[id$="Dropdown"]').forEach(d => {
      d.classList.remove('opacity-100', 'visible');
      d.classList.add('opacity-0', 'invisible');
    });
  });

  setupDropdown('categoryFilterBtn', 'categoryDropdown', 'category');
  setupDropdown('priceFilterBtn', 'priceDropdown', 'price');
  setupDropdown('sortBtn', 'sortDropdown', 'sort', false);

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.search = e.target.value;
      renderProducts();
    });
  }

  // Listen to language changes to re-render products
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-lang') {
        renderProducts();
      }
    });
  });
  
  observer.observe(document.body, { attributes: true });

  // Initial render
  renderProducts();
});
