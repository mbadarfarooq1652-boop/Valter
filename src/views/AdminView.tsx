import React, { useState } from 'react';
import { 
  ShieldCheck, Package, ShoppingBag, Sliders, Type, Image as ImageIcon, 
  Trash2, Edit3, Plus, Check, X, ArrowLeft, RefreshCw, Download, 
  Eye, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock, Lock, KeyRound, ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, CollectionCategory } from '../data/catalog';
import { ValterLogo } from '../components/ValterLogo';

export const AdminView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    categories,
    updateCategory,
    siteConfig,
    updateSiteConfig,
    resetSiteConfigToDefault,
    orders,
    updateOrderStatus,
    deleteOrder,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    setCurrentRoute,
    formatPrice,
    showToast
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'branding' | 'homepage' | 'orders' | 'contact'>('products');

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    slug: '',
    price: 350,
    category: 'mens-watches',
    categoryLabel: "Men's Watches",
    shortDescription: '',
    description: '',
    image: '/images/hero_emerald_watch_1792603314884.jpg',
    inStock: true,
    isFeatured: true,
    isNew: false,
    isPair: false,
    pairDetails: '',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '11.5 mm',
      movement: 'Automatic Calibre',
      crystal: 'Sapphire Crystal',
      waterResistance: '50m / 5 ATM',
      strap: '316L Stainless Steel',
      caseMaterial: 'Surgical Grade Steel'
    }
  });

  // Product search filter in admin
  const [productFilterQuery, setProductFilterQuery] = useState('');
  const [productFilterCat, setProductFilterCat] = useState('all');

  // If not authenticated, show PIN Gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#082F2B] text-[#F5F0E8] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#052522] border border-[#31514A] rounded-sm p-8 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#082F2B] border border-[#B89A6A] flex items-center justify-center mx-auto mb-5 text-[#B89A6A]">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold block mb-1">
            SECURITY RESTRICTED ACCESS
          </span>
          <h2 className="font-serif text-3xl text-white mb-2">
            VALTER Master Admin Portal
          </h2>
          <p className="text-xs text-[#F5F0E8]/70 mb-6 leading-relaxed">
            Please enter your administrator passkey to access product inventory, live CMS content, logo management, and client orders.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin(pinInput);
            }} 
            className="space-y-4"
          >
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#B89A6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin PIN (Default: valter2026)"
                className="w-full pl-10 pr-4 py-3 bg-[#082F2B] border border-[#31514A] focus:border-[#B89A6A] text-xs text-[#F5F0E8] rounded-xs focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B89A6A] hover:bg-[#c9ad7f] text-[#082F2B] font-semibold text-xs tracking-[0.2em] uppercase rounded-xs transition-colors shadow-md"
            >
              UNLOCK CONTROL PANEL
            </button>
          </form>

          {/* Quick unlock helper for development/testing */}
          <div className="mt-6 pt-4 border-t border-[#31514A]/70 flex items-center justify-between text-xs text-[#716F66]">
            <button
              onClick={() => adminLogin('valter2026')}
              className="text-[#B89A6A] hover:underline text-[11px]"
            >
              Quick Unlock (Owner Demo PIN)
            </button>
            <button
              onClick={() => setCurrentRoute('home')}
              className="hover:text-white text-[11px]"
            >
              Back to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle open add product
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      slug: '',
      price: 350,
      category: 'mens-watches',
      categoryLabel: "Men's Watches",
      shortDescription: '',
      description: '',
      image: '/images/hero_emerald_watch_1792603314884.jpg',
      inStock: true,
      isFeatured: true,
      isNew: true,
      isPair: false,
      pairDetails: '',
      specs: {
        caseDiameter: '41 mm',
        caseThickness: '11.5 mm',
        movement: 'Automatic Calibre',
        crystal: 'Anti-Reflective Sapphire Crystal',
        waterResistance: '50m / 5 ATM',
        strap: '316L Solid Steel Link Bracelet',
        caseMaterial: '316L Surgical Grade Steel',
        powerReserve: '42 Hours'
      }
    });
    setIsProductModalOpen(true);
  };

  // Handle open edit product
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProductForm({ ...p });
    setIsProductModalOpen(true);
  };

  // Save product form
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      showToast('Please provide timepiece name and price.');
      return;
    }

    const catSlug = productForm.category || 'mens-watches';
    const catLabel = categories.find(c => c.id === catSlug)?.title || "Men's Watches";

    if (editingProduct) {
      // Update
      const updated: Product = {
        ...editingProduct,
        ...productForm,
        name: productForm.name!,
        price: Number(productForm.price),
        category: catSlug,
        categoryLabel: catLabel,
        description: productForm.description || '',
        shortDescription: productForm.shortDescription || '',
        image: productForm.image || '/images/hero_emerald_watch_1792603314884.jpg',
        inStock: productForm.inStock ?? true,
        isFeatured: productForm.isFeatured ?? false,
        isNew: productForm.isNew ?? false,
        isPair: productForm.isPair ?? false,
        pairDetails: productForm.pairDetails || '',
        specs: {
          caseDiameter: productForm.specs?.caseDiameter || '41 mm',
          caseThickness: productForm.specs?.caseThickness || '11 mm',
          movement: productForm.specs?.movement || 'Automatic',
          crystal: productForm.specs?.crystal || 'Sapphire',
          waterResistance: productForm.specs?.waterResistance || '50m',
          strap: productForm.specs?.strap || 'Leather',
          caseMaterial: productForm.specs?.caseMaterial || 'Steel',
          powerReserve: productForm.specs?.powerReserve,
          display: productForm.specs?.display
        }
      };
      updateProduct(updated);
    } else {
      // Add new
      const newId = `valter-${Date.now()}`;
      const slug = productForm.name!.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const created: Product = {
        id: newId,
        name: productForm.name!,
        slug,
        price: Number(productForm.price),
        currency: '$',
        category: catSlug,
        categoryLabel: catLabel,
        description: productForm.description || '',
        shortDescription: productForm.shortDescription || '',
        image: productForm.image || '/images/hero_emerald_watch_1792603314884.jpg',
        inStock: productForm.inStock ?? true,
        isFeatured: productForm.isFeatured ?? true,
        isNew: productForm.isNew ?? true,
        isPair: productForm.isPair ?? false,
        pairDetails: productForm.pairDetails || '',
        specs: {
          caseDiameter: productForm.specs?.caseDiameter || '41 mm',
          caseThickness: productForm.specs?.caseThickness || '11 mm',
          movement: productForm.specs?.movement || 'Automatic',
          crystal: productForm.specs?.crystal || 'Sapphire',
          waterResistance: productForm.specs?.waterResistance || '50m',
          strap: productForm.specs?.strap || 'Steel',
          caseMaterial: productForm.specs?.caseMaterial || '316L Steel',
          powerReserve: productForm.specs?.powerReserve,
          display: productForm.specs?.display
        }
      };
      addProduct(created);
    }

    setIsProductModalOpen(false);
  };

  // Export data as JSON file
  const handleExportData = () => {
    const dataToExport = {
      siteConfig,
      products,
      categories,
      orders,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valter_store_backup_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported store database to JSON file.');
  };

  // Filtered products in admin list
  const filteredProducts = products.filter(p => {
    const matchesCat = productFilterCat === 'all' || p.category === productFilterCat;
    const matchesQuery = productFilterQuery === '' || 
      p.name.toLowerCase().includes(productFilterQuery.toLowerCase()) ||
      p.specs.movement.toLowerCase().includes(productFilterQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const totalCatalogValue = products.reduce((acc, p) => acc + p.price, 0);
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="min-h-screen bg-[#F4F0E9] text-[#1C2925]">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-[#082F2B] text-[#F5F0E8] border-b border-[#31514A] px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ValterLogo variant="light" size="sm" />
            <div className="h-5 w-[1px] bg-[#31514A]" />
            <span className="bg-[#B89A6A] text-[#082F2B] text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-xs">
              MASTER ADMIN CMS
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setCurrentRoute('home')}
              className="px-3.5 py-2 bg-[#052522] hover:bg-[#0B3B35] text-[#F5F0E8] border border-[#31514A] rounded-xs flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#B89A6A]" />
              <span>View Live Storefront</span>
            </button>

            <a
              href="/valter-hostinger-ready.zip"
              download="valter-hostinger-ready.zip"
              className="px-3.5 py-2 bg-[#B89A6A] hover:bg-[#c9ad7f] text-[#082F2B] font-semibold rounded-xs flex items-center gap-1.5 transition-colors shadow-sm"
              title="Download ready-to-deploy zip for Hostinger / cPanel"
            >
              <Download className="w-3.5 h-3.5 text-[#082F2B]" />
              <span>Hostinger Deploy ZIP</span>
            </a>

            <a
              href="/valter-standalone.html"
              download="index.html"
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-xs flex items-center gap-1.5 transition-colors shadow-sm"
              title="Download single standalone HTML file (HTML + CSS + JS in 1 file)"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download 1-File HTML</span>
            </a>

            <a
              href="/valter-source-code.zip"
              download="valter-source-code.zip"
              className="px-3.5 py-2 bg-[#052522] hover:bg-[#0B3B35] text-[#F5F0E8] border border-[#31514A] rounded-xs flex items-center gap-1.5 transition-colors"
              title="Download full project source code"
            >
              <Download className="w-3.5 h-3.5 text-[#B89A6A]" />
              <span>Full Source Code ZIP</span>
            </a>

            <button
              onClick={handleExportData}
              className="px-3.5 py-2 bg-[#052522] hover:bg-[#0B3B35] text-[#F5F0E8] border border-[#31514A] rounded-xs flex items-center gap-1.5 transition-colors"
              title="Download JSON data of catalog and settings"
            >
              <Download className="w-3.5 h-3.5 text-[#B89A6A]" />
              <span>Export JSON Backup</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-3 py-2 bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/60 rounded-xs transition-colors"
            >
              Lock / Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* KPI Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#DED6CA] rounded-sm p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#716F66] text-xs mb-1">
              <span>Active Timepieces</span>
              <Package className="w-4 h-4 text-[#B89A6A]" />
            </div>
            <div className="font-mono text-2xl font-bold text-[#082F2B]">
              {products.length} Models
            </div>
            <span className="text-[11px] text-emerald-800">
              {products.filter(p => p.inStock).length} in stock · 6 Collections
            </span>
          </div>

          <div className="bg-white border border-[#DED6CA] rounded-sm p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#716F66] text-xs mb-1">
              <span>Client Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#B89A6A]" />
            </div>
            <div className="font-mono text-2xl font-bold text-[#082F2B]">
              {orders.length}
            </div>
            <span className="text-[11px] text-[#716F66]">
              {orders.filter(o => o.status === 'Pending').length} pending dispatch
            </span>
          </div>

          <div className="bg-white border border-[#DED6CA] rounded-sm p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#716F66] text-xs mb-1">
              <span>Orders Revenue</span>
              <ShieldCheck className="w-4 h-4 text-[#B89A6A]" />
            </div>
            <div className="font-mono text-2xl font-bold text-[#082F2B]">
              {formatPrice(totalRevenue)}
            </div>
            <span className="text-[11px] text-[#716F66]">
              Processed via checkout
            </span>
          </div>

          <div className="bg-white border border-[#DED6CA] rounded-sm p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#716F66] text-xs mb-1">
              <span>Total Catalog Value</span>
              <Sliders className="w-4 h-4 text-[#B89A6A]" />
            </div>
            <div className="font-mono text-2xl font-bold text-[#082F2B]">
              {formatPrice(totalCatalogValue)}
            </div>
            <span className="text-[11px] text-[#716F66]">
              Avg price: {formatPrice(Math.round(totalCatalogValue / (products.length || 1)))}
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-[#DED6CA]">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#082F2B] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-[#716F66] hover:bg-[#EAE3D8] hover:text-[#082F2B] border border-[#DED6CA]'
            }`}
          >
            <Package className="w-4 h-4 text-[#B89A6A]" />
            <span>Timepieces Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 ${
              activeTab === 'homepage'
                ? 'bg-[#082F2B] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-[#716F66] hover:bg-[#EAE3D8] hover:text-[#082F2B] border border-[#DED6CA]'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#B89A6A]" />
            <span>Hero & Homepage CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 ${
              activeTab === 'branding'
                ? 'bg-[#082F2B] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-[#716F66] hover:bg-[#EAE3D8] hover:text-[#082F2B] border border-[#DED6CA]'
            }`}
          >
            <Type className="w-4 h-4 text-[#B89A6A]" />
            <span>Logo & Brand Identity</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'bg-[#082F2B] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-[#716F66] hover:bg-[#EAE3D8] hover:text-[#082F2B] border border-[#DED6CA]'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#B89A6A]" />
            <span>The 6 Collections</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#082F2B] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-[#716F66] hover:bg-[#EAE3D8] hover:text-[#082F2B] border border-[#DED6CA]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#B89A6A]" />
            <span>Client Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-[#082F2B] text-[#F5F0E8] shadow-sm'
                : 'bg-white text-[#716F66] hover:bg-[#EAE3D8] hover:text-[#082F2B] border border-[#DED6CA]'
            }`}
          >
            <Phone className="w-4 h-4 text-[#B89A6A]" />
            <span>Boutique & Concierge</span>
          </button>
        </div>

        {/* ================= TAB 1: PRODUCTS INVENTORY ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#DED6CA] rounded-sm p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  value={productFilterQuery}
                  onChange={(e) => setProductFilterQuery(e.target.value)}
                  placeholder="Search timepieces by name or specs..."
                  className="px-3.5 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs text-[#082F2B] rounded-xs focus:outline-none focus:border-[#B89A6A] w-full sm:w-64"
                />

                <select
                  value={productFilterCat}
                  onChange={(e) => setProductFilterCat(e.target.value)}
                  className="px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs text-[#082F2B] rounded-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">All 6 Collections</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={resetProductsToDefault}
                  className="px-3.5 py-2 text-xs text-[#716F66] hover:text-[#082F2B] border border-[#DED6CA] rounded-xs transition-colors flex items-center gap-1.5"
                  title="Reset catalog back to initial 18 watches"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Default Catalog</span>
                </button>

                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4 text-[#B89A6A]" />
                  <span>Add New Timepiece</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-[#DED6CA] rounded-sm overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EAE3D8] text-[#082F2B] uppercase tracking-wider font-semibold border-b border-[#DED6CA]">
                    <tr>
                      <th className="py-3 px-4">Watch / Image</th>
                      <th className="py-3 px-4">Collection</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4">Attributes</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DED6CA]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F4F0E9]/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 rounded-xs object-cover bg-[#EAE3D8] border border-[#DED6CA] shrink-0"
                            />
                            <div>
                              <span className="font-serif text-sm font-medium text-[#082F2B] block">
                                {p.name}
                              </span>
                              <span className="text-[10px] text-[#716F66] line-clamp-1 max-w-xs">
                                {p.shortDescription}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-[#082F2B] font-medium">
                          {p.categoryLabel}
                        </td>

                        <td className="py-3 px-4 font-mono font-semibold text-[#082F2B]">
                          {formatPrice(p.price)}
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => updateProduct({ ...p, inStock: !p.inStock })}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-colors ${
                              p.inStock
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-red-100 text-red-800 border border-red-300'
                            }`}
                          >
                            {p.inStock ? '● In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-[11px] text-[#716F66]">
                          <div className="flex flex-wrap gap-1">
                            {p.isPair && (
                              <span className="bg-[#082F2B] text-[#F5F0E8] px-1.5 py-0.5 rounded-xs text-[9px]">
                                Pair Set
                              </span>
                            )}
                            {p.isFeatured && (
                              <span className="bg-[#EAE3D8] text-[#082F2B] px-1.5 py-0.5 rounded-xs text-[9px]">
                                Featured
                              </span>
                            )}
                            {p.isNew && (
                              <span className="bg-[#B89A6A] text-[#082F2B] font-bold px-1.5 py-0.5 rounded-xs text-[9px]">
                                New
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-[#082F2B] hover:text-[#B89A6A] bg-[#F4F0E9] hover:bg-white border border-[#DED6CA] rounded-xs transition-colors"
                            title="Edit timepiece"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-red-700 hover:text-red-900 bg-[#F4F0E9] hover:bg-red-50 border border-[#DED6CA] rounded-xs transition-colors"
                            title="Delete timepiece"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: THE 6 COLLECTIONS ================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#DED6CA] rounded-sm p-6 shadow-xs">
              <h3 className="font-serif text-xl text-[#082F2B] mb-1">
                Manage the 6 Major Watch Collections
              </h3>
              <p className="text-xs text-[#716F66] mb-6">
                Customize headlines, intro copy, and photography for each individual collection page.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="border border-[#DED6CA] rounded-sm p-5 bg-[#F4F0E9]/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-14 h-14 object-cover rounded-xs border border-[#DED6CA]"
                        />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#B89A6A] font-semibold">
                            {cat.eyebrow}
                          </span>
                          <h4 className="font-serif text-lg text-[#082F2B] font-medium">
                            {cat.title}
                          </h4>
                          <span className="text-[11px] text-[#716F66]">
                            Route: {cat.slug}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mt-4 text-xs">
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                            Collection Title
                          </label>
                          <input
                            type="text"
                            value={cat.title}
                            onChange={(e) => updateCategory({ ...cat, title: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-[#DED6CA] rounded-xs text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                            Eyebrow Label
                          </label>
                          <input
                            type="text"
                            value={cat.eyebrow}
                            onChange={(e) => updateCategory({ ...cat, eyebrow: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-[#DED6CA] rounded-xs text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={cat.description}
                            onChange={(e) => updateCategory({ ...cat, description: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-[#DED6CA] rounded-xs text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                            Banner Image URL
                          </label>
                          <input
                            type="text"
                            value={cat.image}
                            onChange={(e) => updateCategory({ ...cat, image: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-[#DED6CA] rounded-xs text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DED6CA] flex justify-between items-center text-xs">
                      <span className="text-[#716F66]">
                        {products.filter(p => p.category === cat.id).length} watches assigned
                      </span>
                      <button
                        onClick={() => {
                          showToast(`Saved changes to ${cat.title}`);
                        }}
                        className="px-3 py-1.5 bg-[#082F2B] text-[#F5F0E8] font-medium text-[11px] rounded-xs hover:bg-[#0B3B35]"
                      >
                        Save Collection
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: BRANDING & LOGO ================= */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#DED6CA]">
                <div>
                  <h3 className="font-serif text-2xl text-[#082F2B]">
                    Brand Identity & Logo Configuration
                  </h3>
                  <p className="text-xs text-[#716F66]">
                    Modify the brand wordmark, tagline, or provide your custom image logo to display across the entire store.
                  </p>
                </div>
                <button
                  onClick={resetSiteConfigToDefault}
                  className="px-3 py-2 text-xs text-[#716F66] hover:text-[#082F2B] border border-[#DED6CA] rounded-xs"
                >
                  Reset Defaults
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Form fields (7 cols) */}
                <div className="md:col-span-7 space-y-5 text-xs">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#082F2B] block mb-1">
                      Brand Name / Wordmark
                    </label>
                    <input
                      type="text"
                      value={siteConfig.brandName}
                      onChange={(e) => updateSiteConfig({ brandName: e.target.value })}
                      placeholder="e.g. VALTER"
                      className="w-full px-3.5 py-2.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs font-serif text-lg tracking-widest text-[#082F2B] focus:outline-none focus:border-[#B89A6A]"
                    />
                    <p className="text-[11px] text-[#716F66] mt-1">
                      This updates the wordmark in the header, footer, mobile drawer, and checkout.
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#082F2B] block mb-1">
                      Brand Tagline
                    </label>
                    <input
                      type="text"
                      value={siteConfig.brandTagline}
                      onChange={(e) => updateSiteConfig({ brandTagline: e.target.value })}
                      placeholder="e.g. TIMELESS DESIGN. DISTINCTIVE CHARACTER."
                      className="w-full px-3.5 py-2.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs uppercase tracking-wider text-[#082F2B] focus:outline-none focus:border-[#B89A6A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#082F2B] block mb-1">
                      Custom Image Logo URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={siteConfig.customLogoUrl}
                      onChange={(e) => updateSiteConfig({ customLogoUrl: e.target.value })}
                      placeholder="e.g. https://... or /images/my-logo.png (leave blank for horological dial emblem)"
                      className="w-full px-3.5 py-2.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs font-mono text-[#082F2B] focus:outline-none focus:border-[#B89A6A]"
                    />
                    <p className="text-[11px] text-[#716F66] mt-1">
                      If provided, this image will replace the minimalist geometric watch emblem.
                    </p>
                  </div>
                </div>

                {/* Live Preview (5 cols) */}
                <div className="md:col-span-5 bg-[#EAE3D8] border border-[#DED6CA] rounded-sm p-6 space-y-5">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B89A6A] block">
                    LIVE BRAND LOGO PREVIEW
                  </span>

                  {/* Dark surface preview */}
                  <div className="bg-[#082F2B] p-5 rounded-xs border border-[#31514A]">
                    <span className="text-[9px] uppercase tracking-wider text-[#B89A6A] block mb-2 font-mono">
                      On Dark Surfaces (Footer / Hero):
                    </span>
                    <ValterLogo variant="light" size="md" showTagline={true} />
                  </div>

                  {/* Light cream surface preview */}
                  <div className="bg-[#F4F0E9] p-5 rounded-xs border border-[#DED6CA]">
                    <span className="text-[9px] uppercase tracking-wider text-[#716F66] block mb-2 font-mono">
                      On Light Surfaces (Header / Collections):
                    </span>
                    <ValterLogo variant="dark" size="md" showTagline={true} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: HOMEPAGE & HERO CMS ================= */}
        {activeTab === 'homepage' && (
          <div className="space-y-6">
            
            {/* Announcement Banner CMS */}
            <div className="bg-white border border-[#DED6CA] rounded-sm p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-[#082F2B]">
                  Top Announcement Ribbon
                </h3>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={siteConfig.announcementBar.enabled}
                    onChange={(e) => updateSiteConfig({
                      announcementBar: { ...siteConfig.announcementBar, enabled: e.target.checked }
                    })}
                    className="w-4 h-4 accent-[#082F2B]"
                  />
                  <span>Enable Banner</span>
                </label>
              </div>

              <div>
                <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                  Promotional / Announcement Text
                </label>
                <input
                  type="text"
                  value={siteConfig.announcementBar.text}
                  onChange={(e) => updateSiteConfig({
                    announcementBar: { ...siteConfig.announcementBar, text: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs"
                />
              </div>
            </div>

            {/* Hero Section CMS */}
            <div className="bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-2xl text-[#082F2B] mb-1">
                Homepage Hero Section CMS
              </h3>
              <p className="text-xs text-[#716F66] mb-6">
                Edit main headlines, subtexts, button calls-to-action, and the hero featured timepiece photograph.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Hero Eyebrow
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.eyebrow}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, eyebrow: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.headline}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, headline: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Headline Accent Word (Gold Italic)
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.headlineHighlight}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, headlineHighlight: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.imageUrl}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, imageUrl: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Hero Subtitle / Supporting Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.hero.subheadline}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, subheadline: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.primaryCtaText}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, primaryCtaText: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Secondary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.secondaryCtaText}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, secondaryCtaText: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Corner Badge Title
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.badgeTitle}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, badgeTitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Corner Badge Timepiece Label
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.badgeSubtitle}
                    onChange={(e) => updateSiteConfig({
                      hero: { ...siteConfig.hero, badgeSubtitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Philosophy Editorial CMS */}
            <div className="bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-2xl text-[#082F2B] mb-1">
                The VALTER Philosophy Editorial Section
              </h3>
              <p className="text-xs text-[#716F66] mb-6">
                Customize the storytelling text and lifestyle photograph in the brand story section.
              </p>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                      Section Eyebrow
                    </label>
                    <input
                      type="text"
                      value={siteConfig.philosophy.eyebrow}
                      onChange={(e) => updateSiteConfig({
                        philosophy: { ...siteConfig.philosophy, eyebrow: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={siteConfig.philosophy.headline}
                      onChange={(e) => updateSiteConfig({
                        philosophy: { ...siteConfig.philosophy, headline: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.philosophy.paragraph1}
                    onChange={(e) => updateSiteConfig({
                      philosophy: { ...siteConfig.philosophy, paragraph1: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.philosophy.paragraph2}
                    onChange={(e) => updateSiteConfig({
                      philosophy: { ...siteConfig.philosophy, paragraph2: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Lifestyle Photo URL
                  </label>
                  <input
                    type="text"
                    value={siteConfig.philosophy.imageUrl}
                    onChange={(e) => updateSiteConfig({
                      philosophy: { ...siteConfig.philosophy, imageUrl: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs font-mono"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 5: ORDERS & CLIENT LEDGER ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#DED6CA] rounded-sm p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#082F2B]">
                    Client Orders Ledger ({orders.length})
                  </h3>
                  <p className="text-xs text-[#716F66]">
                    Track purchases, courier dispatches, customer shipping information, and order fulfillment.
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-[#716F66]">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-[#B89A6A]" />
                  <p className="text-sm">No customer orders have been received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border border-[#DED6CA] rounded-sm p-5 bg-[#F4F0E9]/40 hover:bg-[#F4F0E9] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#DED6CA] gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-[#082F2B]">
                            #{order.id}
                          </span>
                          <span className="text-xs text-[#716F66]">
                            {order.createdAt}
                          </span>
                          <span className="text-xs bg-[#EAE3D8] text-[#082F2B] px-2 py-0.5 rounded-xs font-mono uppercase">
                            Payment: {order.paymentMethod}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-[#716F66]">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e: any) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-white border border-[#DED6CA] text-xs font-semibold px-2.5 py-1 rounded-xs cursor-pointer focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => {
                              if (confirm(`Delete order #${order.id}?`)) {
                                deleteOrder(order.id);
                              }
                            }}
                            className="p-1 text-red-700 hover:text-red-900"
                            title="Delete order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#716F66] block mb-1">
                            Client & Destination
                          </span>
                          <p className="font-medium text-[#082F2B]">
                            {order.customer.firstName} {order.customer.lastName}
                          </p>
                          <p className="text-[#716F66]">{order.customer.email} · {order.customer.phone}</p>
                          <p className="text-[#716F66]">
                            {order.customer.address}, {order.customer.city} {order.customer.postalCode}, {order.customer.country}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#716F66] block mb-1">
                            Items Ordered ({order.items.length})
                          </span>
                          <div className="space-y-1.5">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[#082F2B]">
                                <span>
                                  {item.quantity}x {item.product.name}
                                  {item.selectedVariant ? ` (${item.selectedVariant})` : ''}
                                </span>
                                <span className="font-mono">{formatPrice(item.product.price * item.quantity)}</span>
                              </div>
                            ))}
                            <div className="pt-1 border-t border-[#DED6CA] flex justify-between font-bold text-sm text-[#082F2B]">
                              <span>Total Charged</span>
                              <span className="font-mono">{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 6: CONTACT & CONCIERGE ================= */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-2xl text-[#082F2B] mb-1">
                Boutique & Concierge Contact Information
              </h3>
              <p className="text-xs text-[#716F66] mb-6">
                Update the official address, concierge response email, and phone numbers shown in the contact page and footer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Concierge Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={siteConfig.contact.conciergeEmail}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, conciergeEmail: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Concierge Direct Phone
                  </label>
                  <input
                    type="text"
                    value={siteConfig.contact.phone}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, phone: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Showroom / Atelier Address
                  </label>
                  <input
                    type="text"
                    value={siteConfig.contact.showroomAddress}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, showroomAddress: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Showroom Hours
                  </label>
                  <input
                    type="text"
                    value={siteConfig.contact.showroomHours}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, showroomHours: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= ADD / EDIT PRODUCT MODAL ================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#082F2B]/85 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          />

          <div className="relative min-h-screen p-4 sm:p-6 flex items-center justify-center">
            <div className="relative bg-white text-[#1C2925] border border-[#DED6CA] rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8">
              
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#716F66] hover:text-[#082F2B]"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] uppercase tracking-wider text-[#B89A6A] font-semibold block mb-1">
                {editingProduct ? 'EDIT HOROLOGICAL TIMEPIECE' : 'ADD NEW LUXURY TIMEPIECE'}
              </span>
              <h3 className="font-serif text-2xl text-[#082F2B] mb-6">
                {editingProduct ? `Edit ${editingProduct.name}` : 'New Timepiece Entry'}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                      Timepiece Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.name || ''}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. The Imperial Chrono"
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                      Price (USD $) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={productForm.price || ''}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                      Shopping Collection *
                    </label>
                    <select
                      value={productForm.category || 'mens-watches'}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                      Image URL (local /images/... or web)
                    </label>
                    <input
                      type="text"
                      value={productForm.image || ''}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Short Description (Product Card)
                  </label>
                  <input
                    type="text"
                    value={productForm.shortDescription || ''}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    placeholder="e.g. Emerald dial with fluted champagne gold bezel..."
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#716F66] block mb-1">
                    Full Description (Product Details Modal)
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs"
                  />
                </div>

                {/* Couple Set Options */}
                <div className="p-3 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#082F2B] mb-2">
                    <input
                      type="checkbox"
                      checked={productForm.isPair || false}
                      onChange={(e) => setProductForm({ ...productForm, isPair: e.target.checked })}
                      className="w-4 h-4 accent-[#082F2B]"
                    />
                    <span>This product is a Coordinated Couple Set (Pair of 2 Watches)</span>
                  </label>
                  {productForm.isPair && (
                    <input
                      type="text"
                      value={productForm.pairDetails || ''}
                      onChange={(e) => setProductForm({ ...productForm, pairDetails: e.target.value })}
                      placeholder="e.g. Set of 2 Timepieces: Includes 1x 40mm and 1x 32mm matching watches in dual velvet box."
                      className="w-full px-3 py-2 bg-white border border-[#DED6CA] rounded-xs text-[11px]"
                    />
                  )}
                </div>

                {/* Specs breakdown */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#716F66] block mb-2">
                    Technical Specifications
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[9px] uppercase text-[#716F66] block">Case Diameter</label>
                      <input
                        type="text"
                        value={productForm.specs?.caseDiameter || ''}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs!, caseDiameter: e.target.value }
                        })}
                        className="w-full px-2.5 py-1.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase text-[#716F66] block">Movement</label>
                      <input
                        type="text"
                        value={productForm.specs?.movement || ''}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs!, movement: e.target.value }
                        })}
                        className="w-full px-2.5 py-1.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase text-[#716F66] block">Crystal</label>
                      <input
                        type="text"
                        value={productForm.specs?.crystal || ''}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs!, crystal: e.target.value }
                        })}
                        className="w-full px-2.5 py-1.5 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.inStock ?? true}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 accent-[#082F2B]"
                    />
                    <span>In Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isFeatured ?? false}
                      onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-[#082F2B]"
                    />
                    <span>Show on Homepage "The VALTER Edit"</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isNew ?? false}
                      onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                      className="w-4 h-4 accent-[#082F2B]"
                    />
                    <span>New Arrival Badge</span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-[#DED6CA] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2.5 border border-[#DED6CA] rounded-xs text-[#716F66] hover:bg-[#F4F0E9]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] font-semibold uppercase tracking-wider rounded-xs shadow-md"
                  >
                    {editingProduct ? 'Save Timepiece' : 'Add to Catalog'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
