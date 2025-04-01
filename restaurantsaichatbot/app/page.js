'use client';
import { useState } from 'react';
import styles from './page.module.css';

// Menu data structure containing all restaurant items organized by category
const menuItems = {
  appetizers: [
    { id: 1, name: 'Buffalo Wings', price: 12.99, description: 'Crispy chicken wings tossed in our signature buffalo sauce, served with blue cheese dressing and celery sticks' },
    { id: 2, name: 'Nachos Supreme', price: 11.99, description: 'Tortilla chips topped with melted cheese, ground beef, black beans, jalapeños, sour cream, and guacamole' },
    { id: 3, name: 'Mozzarella Sticks', price: 8.99, description: 'Breaded mozzarella cheese sticks served with marinara sauce' },
    { id: 4, name: 'Onion Rings', price: 7.99, description: 'Crispy beer-battered onion rings served with ranch dressing' },
    { id: 5, name: 'Spinach Artichoke Dip', price: 9.99, description: 'Creamy blend of spinach, artichokes, and melted cheese served with tortilla chips' },
    { id: 6, name: 'Pretzel Bites', price: 8.99, description: 'Soft pretzel bites served with beer cheese sauce and mustard' },
  ],
  burgers: [
    { id: 7, name: 'Classic Cheeseburger', price: 12.99, description: '1/3 lb beef patty with American cheese, lettuce, tomato, and onion on a brioche bun' },
    { id: 8, name: 'Bacon BBQ Burger', price: 14.99, description: 'Beef patty topped with crispy bacon, BBQ sauce, and onion rings' },
    { id: 9, name: 'Mushroom Swiss Burger', price: 13.99, description: 'Beef patty with sautéed mushrooms and melted Swiss cheese' },
    { id: 10, name: 'Spicy Jalapeño Burger', price: 13.99, description: 'Beef patty with fresh jalapeños, pepper jack cheese, and chipotle mayo' },
    { id: 11, name: 'Bacon Blue Burger', price: 14.99, description: 'Beef patty with crumbled blue cheese, bacon, and caramelized onions' },
  ],
  sandwiches: [
    { id: 12, name: 'Club Sandwich', price: 11.99, description: 'Triple-decker with turkey, bacon, lettuce, tomato, and mayo' },
    { id: 13, name: 'Philly Cheesesteak', price: 13.99, description: 'Sliced steak with onions, peppers, and melted provolone cheese' },
    { id: 14, name: 'Chicken Tender Sandwich', price: 10.99, description: 'Crispy chicken tenders with lettuce, tomato, and honey mustard' },
    { id: 15, name: 'BLT', price: 10.99, description: 'Bacon, lettuce, and tomato on toasted bread' },
    { id: 16, name: 'Reuben', price: 12.99, description: 'Corned beef, sauerkraut, Swiss cheese, and Russian dressing on rye bread' },
  ],
  sides: [
    { id: 17, name: 'French Fries', price: 4.99, description: 'Crispy golden fries seasoned with our special blend of spices' },
    { id: 18, name: 'Sweet Potato Fries', price: 5.99, description: 'Crispy sweet potato fries with cinnamon sugar seasoning' },
    { id: 19, name: 'Tater Tots', price: 5.99, description: 'Crispy potato tots served with ranch dressing' },
    { id: 20, name: 'Mac & Cheese', price: 6.99, description: 'Creamy macaroni and cheese with a blend of cheddar and mozzarella' },
    { id: 21, name: 'Coleslaw', price: 3.99, description: 'Creamy coleslaw with cabbage and carrots' },
  ],
  drinks: [
    { id: 22, name: 'Domestic Beer', price: 5.99, description: 'Selection of domestic beers (Budweiser, Coors, Miller)' },
    { id: 23, name: 'Craft Beer', price: 7.99, description: 'Rotating selection of local craft beers' },
    { id: 24, name: 'House Margarita', price: 8.99, description: 'Fresh lime juice, tequila, and triple sec' },
    { id: 25, name: 'Old Fashioned', price: 9.99, description: 'Bourbon, bitters, sugar, and orange peel' },
    { id: 26, name: 'Soda', price: 2.99, description: 'Various soft drinks (Coke, Sprite, Dr. Pepper)' },
    { id: 27, name: 'Iced Tea', price: 2.99, description: 'Fresh brewed iced tea with optional sweetener' },
  ],
  desserts: [
    { id: 28, name: 'Chocolate Lava Cake', price: 6.99, description: 'Warm chocolate cake with a molten center, served with vanilla ice cream' },
    { id: 29, name: 'Apple Pie', price: 5.99, description: 'Classic apple pie served with whipped cream' },
    { id: 30, name: 'Ice Cream Sundae', price: 6.99, description: 'Vanilla ice cream with hot fudge, nuts, and a cherry on top' },
    { id: 31, name: 'Churros', price: 5.99, description: 'Crispy cinnamon-sugar churros with chocolate dipping sauce' },
    { id: 32, name: 'Milkshake', price: 7.99, description: 'Thick and creamy milkshake in various flavors (vanilla, chocolate, strawberry)' },
  ],
  specials: [
    { id: 33, name: 'Wing Wednesday', price: 0.99, description: 'Half-price wings every Wednesday' },
    { id: 34, name: 'Happy Hour', price: 0.00, description: 'Half-price appetizers and $2 off drinks, Monday-Friday 4-7pm' },
    { id: 35, name: 'Weekend Brunch', price: 0.00, description: 'All-you-can-eat brunch buffet, Saturday-Sunday 10am-2pm' },
  ]
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
