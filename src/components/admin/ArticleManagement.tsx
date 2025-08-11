import React, { useState } from 'react';
import { useArticles } from '../../hooks/useArticles';
import type { Article, ContentBlock } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Calendar,
  User,
  Clock,
  BookOpen,
  Save,
  X,
  Image,
  Video,
  Type,
  List,
  Quote,
  Code,
  Link,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronUp,
  ChevronDown,
  Move
} from 'lucide-react';

const ArticleManagement: React.FC = () => {
  // Use backend data
  const { 
    articles, 
    loading, 
    error, 
    createArticle, 
    updateArticle, 
    deleteArticle 
  } = useArticles();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const categories = ['Investment Basics', 'Technical Analysis', 'Financial Planning', 'Cryptocurrency'];
  const statuses = ['draft', 'published', 'archived'];

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const handleCreateArticle = () => {
    setEditingArticle({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      content_blocks: [],
      author: '',
      category: categories[0],
      status: 'draft',
      publish_date: new Date().toISOString().split('T')[0],
      read_time: '5 min read',
      views: 0,
      tags: [],
      created_at: '',
      updated_at: ''
    });
    setShowModal(true);
  };

  const addContentBlock = (type: ContentBlock['type']) => {
    if (!editingArticle) return;
    
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      metadata: type === 'heading' ? { level: 2 } : 
                type === 'list' ? { listType: 'unordered' } :
                type === 'code' ? { language: 'javascript' } : {}
    };
    
    setEditingArticle({
      ...editingArticle,
      content_blocks: [...editingArticle.content_blocks, newBlock]
    });
  };

  const updateContentBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    if (!editingArticle) return;
    
    setEditingArticle({
      ...editingArticle,
      content_blocks: editingArticle.content_blocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    });
  };

  const deleteContentBlock = (blockId: string) => {
    if (!editingArticle) return;
    
    setEditingArticle({
      ...editingArticle,
      content_blocks: editingArticle.content_blocks.filter(block => block.id !== blockId)
    });
  };

  const moveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!editingArticle) return;
    
    const blocks = [...editingArticle.content_blocks];
    const index = blocks.findIndex(block => block.id === blockId);
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }
    
    setEditingArticle({
      ...editingArticle,
      content_blocks: blocks
    });
  };

  const getBlockIcon = (type: ContentBlock['type']) => {
    switch (type) {
      case 'heading': return Type;
      case 'paragraph': return AlignLeft;
      case 'image': return Image;
      case 'video': return Video;
      case 'quote': return Quote;
      case 'list': return List;
      case 'code': return Code;
      default: return Type;
    }
  };

  const renderContentBlockEditor = (block: ContentBlock, index: number) => {
    const BlockIcon = getBlockIcon(block.type);
    
    return (
      <div key={block.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
        {/* Block Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BlockIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700 capitalize">{block.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => moveContentBlock(block.id, 'up')}
              disabled={index === 0 || !editingArticle}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => moveContentBlock(block.id, 'down')}
              disabled={!editingArticle || index === editingArticle.content_blocks.length - 1}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => deleteContentBlock(block.id)}
              className="p-1 text-red-400 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Block Content Editor */}
        {block.type === 'heading' && (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <select
                value={block.metadata?.level || 2}
                onChange={(e) => updateContentBlock(block.id, {
                  metadata: { ...block.metadata, level: parseInt(e.target.value) }
                })}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
              >
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
                <option value={4}>H4</option>
              </select>
              <select
                value={block.metadata?.alignment || 'left'}
                onChange={(e) => updateContentBlock(block.id, {
                  metadata: { ...block.metadata, alignment: e.target.value as 'left' | 'center' | 'right' }
                })}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Enter heading text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {block.type === 'paragraph' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                <Bold className="h-4 w-4" />
              </button>
              <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                <Italic className="h-4 w-4" />
              </button>
              <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                <AlignLeft className="h-4 w-4" />
              </button>
              <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                <AlignCenter className="h-4 w-4" />
              </button>
              <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                <AlignRight className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Enter paragraph content"
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {block.type === 'image' && (
          <div className="space-y-3">
            <input
              type="url"
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={block.metadata?.alt || ''}
              onChange={(e) => updateContentBlock(block.id, {
                metadata: { ...block.metadata, alt: e.target.value }
              })}
              placeholder="Alt text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={block.metadata?.caption || ''}
              onChange={(e) => updateContentBlock(block.id, {
                metadata: { ...block.metadata, caption: e.target.value }
              })}
              placeholder="Image caption (optional)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {block.content && (
              <div className="mt-2">
                <img 
                  src={block.content} 
                  alt={block.metadata?.alt || 'Preview'} 
                  className="max-w-full h-32 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        )}

        {block.type === 'video' && (
          <div className="space-y-3">
            <input
              type="url"
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Enter video URL (YouTube, Vimeo, etc.)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={block.metadata?.caption || ''}
              onChange={(e) => updateContentBlock(block.id, {
                metadata: { ...block.metadata, caption: e.target.value }
              })}
              placeholder="Video caption (optional)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {block.content && (
              <div className="mt-2 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Video className="h-4 w-4" />
                  <span className="text-sm">Video: {block.content}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {block.type === 'quote' && (
          <div className="space-y-3">
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Enter quote text"
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={block.metadata?.caption || ''}
              onChange={(e) => updateContentBlock(block.id, {
                metadata: { ...block.metadata, caption: e.target.value }
              })}
              placeholder="Quote author (optional)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {block.type === 'list' && (
          <div className="space-y-3">
            <select
              value={block.metadata?.listType || 'unordered'}
              onChange={(e) => updateContentBlock(block.id, {
                metadata: { ...block.metadata, listType: e.target.value as 'ordered' | 'unordered' }
              })}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
            >
              <option value="unordered">Bullet List</option>
              <option value="ordered">Numbered List</option>
            </select>
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Enter list items (one per line)"
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {block.type === 'code' && (
          <div className="space-y-3">
            <select
              value={block.metadata?.language || 'javascript'}
              onChange={(e) => updateContentBlock(block.id, {
                metadata: { ...block.metadata, language: e.target.value }
              })}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
              <option value="sql">SQL</option>
            </select>
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Enter code"
              rows={6}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
        )}
      </div>
    );
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle({ ...article });
    setShowModal(true);
  };

  const handleSaveArticle = () => {
    if (!editingArticle) return;

    if (editingArticle.id === '') {
      // Create new article
      const { id, created_at, updated_at, ...articleData } = editingArticle;
      createArticle(articleData).then(() => {
        setShowModal(false);
        setEditingArticle(null);
      }).catch(err => {
        console.error('Error creating article:', err);
        alert('Error creating article. Please try again.');
      });
    } else {
      // Update existing article
      const { created_at, updated_at, ...updates } = editingArticle;
      updateArticle(editingArticle.id, updates).then(() => {
        setShowModal(false);
        setEditingArticle(null);
      }).catch(err => {
        console.error('Error updating article:', err);
        alert('Error updating article. Please try again.');
      });
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(id);
      } catch (err) {
        console.error('Error deleting article:', err);
        alert('Error deleting article. Please try again.');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: Article['status']) => {
    try {
      await updateArticle(id, { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating status. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show error message if backend fails
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Backend Connection Error</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <p className="text-sm text-red-600">
            Please ensure Supabase is connected and the database is set up properly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Article Management</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts and educational content</p>
        </div>
        <button
          onClick={handleCreateArticle}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Create Article
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 font-medium">Error: {error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Articles</p>
              <p className="text-3xl font-bold text-gray-900">{articles.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">{articles.filter(a => a.status === 'published').length}</p>
            </div>
            <Eye className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-3xl font-bold text-yellow-600">{articles.filter(a => a.status === 'draft').length}</p>
            </div>
            <Edit className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-purple-600">{articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}</p>
            </div>
            <Eye className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading articles from database...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Article</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">{article.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{article.read_time}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{article.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{article.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={article.status}
                        onChange={(e) => handleStatusChange(article.id, e.target.value as Article['status'])}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${getStatusColor(article.status)}`}
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{article.views.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publish_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditArticle(article)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + articlesPerPage, filteredArticles.length)} of {filteredArticles.length} articles
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && editingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingArticle.id === '' ? 'Create New Article' : 'Edit Article'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter article title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the article"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content (Legacy Editor)</label>
                <textarea
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Legacy content editor (use Rich Content Builder below for better formatting)"
                />
              </div>

              {/* Rich Content Builder */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">Rich Content Builder</label>
                  <div className="text-xs text-gray-500">
                    {editingArticle.content_blocks.length} content blocks
                  </div>
                </div>
                
                {/* Content Block Toolbar */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-700">Add Content Block:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { type: 'heading' as const, icon: Type, label: 'Heading' },
                      { type: 'paragraph' as const, icon: AlignLeft, label: 'Paragraph' },
                      { type: 'image' as const, icon: Image, label: 'Image' },
                      { type: 'video' as const, icon: Video, label: 'Video' },
                      { type: 'quote' as const, icon: Quote, label: 'Quote' },
                      { type: 'list' as const, icon: List, label: 'List' },
                      { type: 'code' as const, icon: Code, label: 'Code' }
                    ].map(blockType => (
                      <button
                        key={blockType.type}
                        onClick={() => addContentBlock(blockType.type)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        <blockType.icon className="h-4 w-4" />
                        {blockType.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Blocks */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {editingArticle.content_blocks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Type className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No content blocks yet. Add your first block above!</p>
                    </div>
                  ) : (
                    editingArticle.content_blocks.map((block, index) => 
                      renderContentBlockEditor(block, index)
                    )
                  )}
                </div>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as Article['status'] })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={editingArticle.publish_date}
                    onChange={(e) => setEditingArticle({ ...editingArticle, publish_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                <input
                  type="text"
                  value={editingArticle.read_time}
                  onChange={(e) => setEditingArticle({ ...editingArticle, read_time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5 min read"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingArticle.tags.join(', ')}
                  onChange={(e) => setEditingArticle({ 
                    ...editingArticle, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., investing, beginner, finance"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveArticle}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {editingArticle.id === '' ? 'Create Article' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManagement;