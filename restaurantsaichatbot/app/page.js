'use client';
import { useState } from 'react';
import styles from './page.module.css';

// Menu data structure containing all restaurant items organized by category
const menuItems = {
  appetizers: [
    { id: 1, name: 'Bruschetta', price: 8.99, description: 'Toasted bread with tomatoes, garlic, and basil' },
    { id: 2, name: 'Calamari', price: 12.99, description: 'Crispy fried squid with marinara sauce' },
    { id: 3, name: 'Caprese Salad', price: 10.99, description: 'Fresh mozzarella, tomatoes, and basil' },
  ],
  mainCourses: [
    { id: 4, name: 'Margherita Pizza', price: 16.99, description: 'Classic tomato sauce, mozzarella, and basil' },
    { id: 5, name: 'Spaghetti Carbonara', price: 18.99, description: 'Pasta with eggs, cheese, pancetta, and black pepper' },
    { id: 6, name: 'Grilled Salmon', price: 24.99, description: 'Fresh salmon with seasonal vegetables' },
  ],
  desserts: [
    { id: 7, name: 'Tiramisu', price: 8.99, description: 'Classic Italian coffee-flavored dessert' },
    { id: 8, name: 'Gelato', price: 6.99, description: 'Italian ice cream with various flavors' },
    { id: 9, name: 'Cannoli', price: 7.99, description: 'Crispy pastry filled with sweet ricotta' },
  ],
  drinks: [
    { id: 10, name: 'Italian Red Wine', price: 9.99, description: 'House red wine' },
    { id: 11, name: 'Espresso', price: 3.99, description: 'Traditional Italian coffee' },
    { id: 12, name: 'Limoncello', price: 7.99, description: 'Italian lemon liqueur' },
  ],
};

export default function Home() {
  // State management for chat messages, input field, loading state, and active menu category
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! I\'m your personal restaurant assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  /**
   * Handles sending messages to the chatbot
   * @param {Event} e - Form submission event
   */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setIsLoading(true);

    try {
      // Send message to ChatGPT API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          menu: menuItems
        }),
      });

      const data = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, { type: 'bot', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      // Show error message to user
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'I apologize, but I\'m having trouble connecting to the server. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  // Filter menu items based on selected category
  const filteredMenu = activeCategory === 'all' 
    ? menuItems 
    : { [activeCategory]: menuItems[activeCategory] };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1>Welcome to Our Restaurant</h1>
        <p>Your AI Assistant is here to help!</p>
      </header>

      <div className={styles.mainContent}>
        {/* Menu Section */}
        <div className={styles.menuSection}>
          {/* Menu Image/Header */}
          <div className={styles.menuImage}>
            <div className={styles.imagePlaceholder}>
              <h2>Our Delicious Menu</h2>
            </div>
          </div>
          
          {/* Category Navigation Tabs */}
          <div className={styles.categoryTabs}>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {Object.keys(menuItems).map(category => (
              <button
                key={category}
                className={`${styles.categoryTab} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Menu Items List */}
          <div className={styles.menuList}>
            {Object.entries(filteredMenu).map(([category, items]) => (
              <div key={category} className={styles.menuCategory}>
                <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <ul>
                  {items.map(item => (
                    <li key={item.id}>
                      <div className={styles.menuItem}>
                        <div className={styles.itemInfo}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemDescription}>{item.description}</span>
                        </div>
                        <span className={styles.itemPrice}>${item.price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <h2>Chat with Our Assistant</h2>
            <p>Ask about our menu or place an order</p>
          </div>
          <div className={styles.chatContainer}>
            {/* Chat Messages */}
            <div className={styles.messages}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${message.type === 'user' ? styles.userMessage : styles.botMessage}`}
                >
                  {message.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              ))}
              {/* Loading Indicator */}
              {isLoading && (
                <div className={`${styles.message} ${styles.botMessage}`}>
                  <div className={styles.thinking}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className={styles.inputForm}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our menu or place an order..."
                className={styles.input}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={styles.sendButton}
                disabled={isLoading}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
