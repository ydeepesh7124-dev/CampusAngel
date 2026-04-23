import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Plus, Filter, Book, Download, MapPin, Tag } from 'lucide-react';

const INITIAL_BOOKS = [
  { id: 1, title: 'Introduction to Algorithms, 3rd Ed', author: 'Thomas H. Cormen', price: '₹45', originalPrice: '₹100', type: 'Physical', condition: 'Good', user: 'Rahul K.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200' },
  { id: 2, title: 'Data Structures Flashcards (PDF)', author: 'Sarah M.', price: '₹5', originalPrice: 'N/A', type: 'E-Book', condition: 'Digital', user: 'Sarah M.', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200' },
  { id: 3, title: 'Physics 101 Lecture Notes', author: 'Alex D.', price: 'Free', originalPrice: 'N/A', type: 'E-Book', condition: 'Digital', user: 'Alex D.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200' },
  { id: 4, title: 'Calculus: Early Transcendentals', author: 'James Stewart', price: '₹30', originalPrice: '₹120', type: 'Physical', condition: 'Like New', user: 'Priya S.', image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4bc?auto=format&fit=crop&q=80&w=200' },
];

export default function BookBazaar() {
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '', type: 'Physical' });

  const handlePostBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.price) return;
    
    const book = {
      id: Date.now(),
      title: newBook.title,
      author: newBook.author || 'Unknown',
      price: newBook.price.includes('₹') || newBook.price.toLowerCase() === 'free' ? newBook.price : `₹${newBook.price}`,
      originalPrice: 'N/A',
      type: newBook.type,
      condition: newBook.type === 'E-Book' ? 'Digital' : 'Good',
      user: 'Deepesh',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=200'
    };
    
    setBooks([book, ...books]);
    setShowModal(false);
    setNewBook({ title: '', author: '', price: '', type: 'Physical' });
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || book.type.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="responsive-padding" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="responsive-title" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Book<span className="gradient-text">Baazar</span> 📚
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Buy, sell, and share textbooks and digital notes with your peers.
          </p>
        </motion.div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-icon" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <Filter size={18} />
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} />
            <span>List an Item</span>
          </button>
        </div>
      </div>

      {/* Search and Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {['All', 'Physical', 'E-Book'].map((tab) => {
            const tabId = tab.toLowerCase();
            const isActive = activeTab === tabId;
            return (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '100px',
                  fontSize: '15px',
                  fontWeight: isActive ? '600' : '500',
                  backgroundColor: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', padding: '0 16px', borderRadius: '12px', border: '1px solid var(--border-color)', height: '40px', width: '100%', maxWidth: '300px' }}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search books or notes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'white', padding: '0 12px', outline: 'none', fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
        <AnimatePresence>
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {filteredBooks.map((book, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                key={book.id}
                className="glass-panel"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}
              >
                <div style={{ height: '160px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img src={book.image} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 12px', borderRadius: '100px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {book.type === 'E-Book' ? <Download size={12} /> : <Book size={12} />}
                    {book.type}
                  </div>
                </div>
                
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)', lineHeight: '1.4' }}>{book.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>by {book.author}</p>
                  
                  <div style={{ display: 'flex', gap: '8px', marginBottom: 'auto' }}>
                    <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px', color: 'var(--text-secondary)' }}>
                      Condition: {book.condition}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>{book.price}</div>
                      {book.originalPrice !== 'N/A' && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>New: {book.originalPrice}</div>}
                    </div>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                      {book.type === 'E-Book' ? 'Get Now' : 'Contact Seller'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredBooks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <ShoppingBag size={48} opacity={0.2} />
            <p>No items found matching your search.</p>
          </div>
        )}
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel responsive-sidebar" style={{ width: '500px', maxWidth: '90vw', padding: '32px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>List an Item</h2>
              
              <form onSubmit={handlePostBook} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Title</label>
                  <input 
                    type="text" required value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})}
                    placeholder="e.g. Campbell Biology 12th Ed"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                  />
                </div>
                
                <div className="responsive-flex" style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Author/Creator</label>
                    <input 
                      type="text" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})}
                      placeholder="e.g. Urry, Cain"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Price</label>
                    <input 
                      type="text" required value={newBook.price} onChange={e => setNewBook({...newBook, price: e.target.value})}
                      placeholder="e.g. ₹20 or Free"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'white', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Type</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" checked={newBook.type === 'Physical'} onChange={() => setNewBook({...newBook, type: 'Physical'})} /> Physical Book
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" checked={newBook.type === 'E-Book'} onChange={() => setNewBook({...newBook, type: 'E-Book'})} /> E-Book / Digital Notes
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>List Item</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
