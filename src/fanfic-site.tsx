import React, { useState } from 'react';
import { Search, Menu, Star, TrendingUp, BookOpen, Users, Plus, Edit3, Save, X, Eye, Calendar, Hash, User, Lock, Mail, UserPlus, LogOut, Shield } from 'lucide-react';

const FanficSite = () => {
  const [activeTab, setActiveTab] = useState('power');
  const [currentView, setCurrentView] = useState('home'); // home, create, write, mybooks, login, register
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]); // Simulated user database
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    genre: '',
    tags: [],
    cover: null
  });
  const [newChapter, setNewChapter] = useState({
    title: '',
    content: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const categories = [
    { name: 'Life System', genre: 'Urban', color: 'bg-blue-500' },
    { name: 'Background...', genre: 'Fantasy', color: 'bg-purple-500' },
    { name: 'Sign-In fro...', genre: 'Urban', color: 'bg-green-500' },
    { name: 'Fireball an...', genre: 'Urban', color: 'bg-red-500' },
    { name: '10000...', genre: 'Eastern', color: 'bg-yellow-500' },
    { name: 'Shadow...', genre: 'Fantasy', color: 'bg-indigo-500' },
    { name: 'Now I Have...', genre: 'Fantasy', color: 'bg-pink-500' },
    { name: 'simulate lif...', genre: 'Sci-fi', color: 'bg-cyan-500' }
  ];

  const rankings = {
    power: [
      { rank: 1, title: 'Endless Path : Infinite Cosmos', category: 'Anime & Comics', rating: 4.8, image: '/api/placeholder/60/80' },
      { rank: 2, title: 'Dragonborn Saga [Skyrim Inspired]', category: 'Video Games', rating: 4.7, image: '/api/placeholder/60/80' },
      { rank: 3, title: 'A Nascent Kaleidoscope.', category: 'Anime & Comics', rating: 4.5, image: '/api/placeholder/60/80' },
      { rank: 4, title: 'Journey Towards Greatness', category: 'Anime & Comics', rating: 4.5, image: '/api/placeholder/60/80' },
      { rank: 5, title: 'Sis-Con with Dimensional Chat Group', category: 'Anime & Comics', rating: 4.6, image: '/api/placeholder/60/80' }
    ],
    collection: [
      { rank: 1, title: 'Harry Potter: The Last Heir...', category: 'Movies', rating: 4.8, image: '/api/placeholder/60/80' },
      { rank: 2, title: 'Only One Year Left—I\'ll Become...', category: 'Video Games', rating: 4.8, image: '/api/placeholder/60/80' },
      { rank: 3, title: 'Harry Potter: Is Harry\'s mom...', category: 'Movies', rating: 4.9, image: '/api/placeholder/60/80' },
      { rank: 4, title: 'I Don\'t Want to Be a Heroic...', category: 'Anime & Comics', rating: 4.5, image: '/api/placeholder/60/80' },
      { rank: 5, title: 'Furina, Please Let Me Steal...', category: 'Video Games', rating: 4.8, image: '/api/placeholder/60/80' }
    ],
    active: [
      { rank: 1, title: 'Harry Potter: The Last Heir...', category: 'Movies', rating: 4.8, image: '/api/placeholder/60/80' },
      { rank: 2, title: 'I Don\'t Want to Be a Heroic...', category: 'Anime & Comics', rating: 4.5, image: '/api/placeholder/60/80' },
      { rank: 3, title: 'Harry Potter: Is Harry\'s mom...', category: 'Movies', rating: 4.9, image: '/api/placeholder/60/80' },
      { rank: 4, title: 'The Gem of Section E - The...', category: 'Books&Literature', rating: 4.8, image: '/api/placeholder/60/80' },
      { rank: 5, title: 'I Became Robin?! (Honkai Im...', category: 'Video Games', rating: 4.9, image: '/api/placeholder/60/80' }
    ]
  };

  const tags = [
    { name: 'ISEKAI', color: 'text-blue-600' },
    { name: 'ANIME', color: 'text-purple-600' },
    { name: 'NARUTO', color: 'text-orange-600' },
    { name: 'MARVEL', color: 'text-red-600' },
    { name: 'YAOI', color: 'text-pink-600' },
    { name: 'ONEPIECE', color: 'text-green-600' },
    { name: 'HARRYPOTTER', color: 'text-indigo-600' },
    { name: 'YURI', color: 'text-rose-600' }
  ];

  const getRankingIcon = (type) => {
    switch(type) {
      case 'power': return <TrendingUp className="w-5 h-5" />;
      case 'collection': return <BookOpen className="w-5 h-5" />;
      case 'active': return <Users className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  // Authentication functions
  const handleLogin = () => {
    const user = users.find(u => u.email === loginForm.email && u.password === loginForm.password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentView('home');
      setLoginForm({ email: '', password: '' });
    } else {
      alert('Invalid email or password!');
    }
  };

  const handleRegister = () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (users.some(u => u.email === registerForm.email)) {
      alert('Email already exists!');
      return;
    }

    const newUser = {
      id: Date.now(),
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      createdAt: new Date().toISOString(),
      avatar: null
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setCurrentView('home');
    setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentView('home');
    setBooks([]);
    setCurrentBook(null);
  };

  const addTag = () => {
    if (tagInput.trim() && !newBook.tags.includes(tagInput.trim())) {
      setNewBook(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewBook(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const createBook = () => {
    if (newBook.title && newBook.description && newBook.genre) {
      const book = {
        id: Date.now(),
        ...newBook,
        authorId: currentUser.id,
        authorName: currentUser.username,
        chapters: [],
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0
      };
      setBooks(prev => [...prev, book]);
      setNewBook({ title: '', description: '', genre: '', tags: [], cover: null });
      setCurrentView('mybooks');
    }
  };

  const addChapter = () => {
    if (currentBook && newChapter.title && newChapter.content) {
      const chapter = {
        id: Date.now(),
        ...newChapter,
        createdAt: new Date().toISOString(),
        views: 0
      };
      
      setBooks(prev => prev.map(book => 
        book.id === currentBook.id 
          ? { ...book, chapters: [...book.chapters, chapter] }
          : book
      ));
      
      setCurrentBook(prev => ({
        ...prev,
        chapters: [...prev.chapters, chapter]
      }));
      
      setNewChapter({ title: '', content: '' });
    }
  };

  const getRankingColor = (type) => {
    switch(type) {
      case 'power': return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'collection': return 'bg-gradient-to-r from-blue-500 to-purple-500';
      case 'active': return 'bg-gradient-to-r from-green-500 to-teal-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  // Create Book Form Component
  const CreateBookForm = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Create New Story</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={newBook.title}
                onChange={(e) => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your story title..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Genre *</label>
              <select
                value={newBook.genre}
                onChange={(e) => setNewBook(prev => ({ ...prev, genre: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Select Genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Add tags..."
                />
                <button
                  onClick={addTag}
                  className="px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {newBook.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-2 text-blue-600 hover:text-blue-800">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              value={newBook.description}
              onChange={(e) => setNewBook(prev => ({ ...prev, description: e.target.value }))}
              rows="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Write a compelling description for your story..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={createBook}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Create Story</span>
          </button>
        </div>
      </div>
    </div>
  );

  // My Books Component
  const MyBooks = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Stories</h2>
        <button
          onClick={() => setCurrentView('create')}
          className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Story</span>
        </button>
      </div>

      {books.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories yet</h3>
          <p className="text-gray-500 mb-6">Start your writing journey by creating your first story!</p>
          <button
            onClick={() => requireAuth(() => setCurrentView('create'))}
            className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600"
          >
            Create Your First Story
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{book.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{book.genre}</span>
                <span>{book.chapters.length} chapters</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setCurrentBook(book);
                    setCurrentView('write');
                  }}
                  className="flex-1 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 text-sm flex items-center justify-center space-x-1"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Write</span>
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 text-sm flex items-center justify-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Chapter Writing Component
  const ChapterWriter = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentBook?.title}</h2>
              <p className="text-gray-600">Chapter {currentBook?.chapters.length + 1}</p>
            </div>
            <button
              onClick={() => setCurrentView('mybooks')}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Chapter Title</label>
              <input
                type="text"
                value={newChapter.title}
                onChange={(e) => setNewChapter(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter chapter title..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
              <textarea
                value={newChapter.content}
                onChange={(e) => setNewChapter(prev => ({ ...prev, content: e.target.value }))}
                rows="20"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                placeholder="Start writing your chapter..."
              />
              <div className="text-sm text-gray-500 mt-2">
                Words: {newChapter.content.split(' ').filter(word => word.length > 0).length}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => setNewChapter({ title: '', content: '' })}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              onClick={addChapter}
              className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Publish Chapter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Existing Chapters */}
      {currentBook?.chapters.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Published Chapters</h3>
          <div className="space-y-3">
            {currentBook.chapters.map((chapter, index) => (
              <div key={chapter.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Chapter {index + 1}: {chapter.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(chapter.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Hash className="w-4 h-4" />
                      <span>{chapter.content.split(' ').filter(word => word.length > 0).length} words</span>
                    </span>
                  </div>
                </div>
                <button className="text-cyan-600 hover:text-cyan-800">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-cyan-500 text-white font-bold text-xl px-3 py-1 rounded">
                W
              </div>
              <nav className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setCurrentView('home')}
                  className={`flex items-center hover:text-gray-900 ${currentView === 'home' ? 'text-cyan-600 font-semibold' : 'text-gray-600'}`}
                >
                  <Menu className="w-4 h-4 mr-1" />
                  Browse
                </button>
                <button className="text-gray-600 hover:text-gray-900">Rankings</button>
                <button 
                  onClick={() => requireAuth(() => setCurrentView('create'))}
                  className={`hover:text-gray-900 ${currentView === 'create' ? 'text-cyan-600 font-semibold' : 'text-gray-600'}`}
                >
                  Create
                </button>
                <button 
                  onClick={() => requireAuth(() => setCurrentView('mybooks'))}
                  className={`hover:text-gray-900 ${currentView === 'mybooks' ? 'text-cyan-600 font-semibold' : 'text-gray-600'}`}
                >
                  My Books
                </button>
                <button className="text-gray-600 hover:text-gray-900">Contest</button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 hover:text-gray-900">Library</button>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {currentUser?.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">{currentUser?.username}</span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-gray-700 p-1"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button className="text-gray-600 hover:text-gray-900">Library</button>
                  <button
                    onClick={() => setCurrentView('login')}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setCurrentView('register')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4">
              <div className={`${category.color} w-full h-16 rounded-lg mb-3 flex items-center justify-center`}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 truncate">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.genre}</p>
            </div>
          ))}
        </div>

        {/* Top Fanfic Books Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Top Fanfic Books</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">MORE</button>
          </div>

          {/* Ranking Tabs */}
          <div className="flex space-x-1 mb-6">
            {[
              { key: 'power', label: 'Power Ranking' },
              { key: 'collection', label: 'Collection Ranking' },
              { key: 'active', label: 'Active Ranking' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.key
                    ? `${getRankingColor(tab.key)} text-white shadow-lg`
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {getRankingIcon(tab.key)}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Rankings Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              {rankings[activeTab].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className={`text-2xl font-bold w-8 ${
                    index === 0 ? 'text-yellow-500' : 
                    index === 1 ? 'text-gray-400' : 
                    index === 2 ? 'text-orange-400' : 'text-gray-500'
                  }`}>
                    {String(item.rank).padStart(2, '0')}
                  </div>
                  
                  <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                EXTEND MORE
              </button>
            </div>
          </div>
        </div>

        {/* Top Fanfic Tags */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Fanfic Tags</h2>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <button
                key={index}
                className={`px-4 py-2 bg-white rounded-full border-2 border-gray-200 hover:border-current transition-colors font-semibold ${tag.color}`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Windows Notification */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
        <p className="text-sm text-gray-600">Windows'u Etkinleştir</p>
        <p className="text-xs text-gray-500">Windows'u etkinleştirmek için ayarlara gidin</p>
      </div>
    </div>
  );
};

export default FanficSite;