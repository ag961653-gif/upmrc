import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import * as quickLinkService from '../services/quickLinkService';
import * as holidayService from '../services/holidayService';
import * as newsService from '../services/newsService';
import PortalLayout from '../components/Layout/PortalLayout';

const TABS = [
  { key: 'quicklinks', label: 'Quick Links' },
  { key: 'holidays', label: 'Holidays' },
  { key: 'news', label: 'News Clippings' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('quicklinks');

  return (
    <PortalLayout>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Admin Panel</h2>
          <p className="text-slate-500 mt-1">Manage the content shown across the portal's homepage.</p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'quicklinks' && <QuickLinksPanel />}
        {activeTab === 'holidays' && <HolidaysPanel />}
        {activeTab === 'news' && <NewsPanel />}
      </main>
    </PortalLayout>
  );
}

function PanelShell({ title, description, onAdd, addLabel, children }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <p className="text-slate-500 mt-1 text-sm">{description}</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all text-sm"
        >
          <FaPlus className="text-xs" /> {addLabel}
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="text-center py-16">
      <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaPlus className="text-slate-400 text-xl" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-1">Nothing here yet</h3>
      <p className="text-slate-500">{label}</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

function Modal({ title, onClose, onSubmit, children }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {children}
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ label, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaTrash className="text-red-600 text-xl" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete this?</h3>
        <p className="text-slate-500 mb-6">
          <span className="font-semibold text-slate-700">{label}</span> will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-sm transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

function QuickLinksPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ title: '', url: '', order: 0 });

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await quickLinkService.getQuickLinks());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setModalItem({}); setForm({ title: '', url: '', order: 0 }); };
  const openEdit = (item) => { setModalItem(item); setForm({ title: item.title, url: item.url, order: item.order || 0 }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalItem._id) {
      await quickLinkService.updateQuickLink(modalItem._id, form);
    } else {
      await quickLinkService.addQuickLink(form);
    }
    setModalItem(null);
    fetchItems();
  };

  const handleDelete = async () => {
    await quickLinkService.deleteQuickLink(deleteItem._id);
    setDeleteItem(null);
    fetchItems();
  };

  return (
    <PanelShell title="Quick Links" description="Links shown in the sidebar Quick Links widget." onAdd={openAdd} addLabel="Add Link">
      {loading ? <Loading /> : items.length === 0 ? <EmptyState label="Add a quick link to get started." /> : (
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item._id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 group">
              <div>
                <div className="font-medium text-slate-900">{item.title}</div>
                <div className="text-sm text-slate-500">{item.url}</div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FaEdit /></button>
                <button onClick={() => setDeleteItem(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalItem && (
        <Modal title={modalItem._id ? 'Edit Link' : 'Add Link'} onClose={() => setModalItem(null)} onSubmit={handleSubmit}>
          <div>
            <label className={labelClass}>Title</label>
            <input className={inputClass} required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Official Mail" />
          </div>
          <div>
            <label className={labelClass}>URL</label>
            <input className={inputClass} required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://mail.upmrc.com" />
          </div>
          <div>
            <label className={labelClass}>Order (lower shows first)</label>
            <input type="number" className={inputClass} value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setModalItem(null)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl">Save</button>
          </div>
        </Modal>
      )}

      {deleteItem && <DeleteModal label={deleteItem.title} onCancel={() => setDeleteItem(null)} onConfirm={handleDelete} />}
    </PanelShell>
  );
}

function HolidaysPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', description: '' });

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await holidayService.getHolidays());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setModalItem({}); setForm({ title: '', date: '', description: '' }); };
  const openEdit = (item) => { setModalItem(item); setForm({ title: item.title, date: item.date?.slice(0, 10) || '', description: item.description || '' }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalItem._id) {
      await holidayService.updateHoliday(modalItem._id, form);
    } else {
      await holidayService.addHoliday(form);
    }
    setModalItem(null);
    fetchItems();
  };

  const handleDelete = async () => {
    await holidayService.deleteHoliday(deleteItem._id);
    setDeleteItem(null);
    fetchItems();
  };

  return (
    <PanelShell title="Holidays" description="Dates highlighted on the homepage calendar." onAdd={openAdd} addLabel="Add Holiday">
      {loading ? <Loading /> : items.length === 0 ? <EmptyState label="Add a holiday to get started." /> : (
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item._id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 group">
              <div>
                <div className="font-medium text-slate-900">{item.title}</div>
                <div className="text-sm text-slate-500">{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}{item.description ? ` — ${item.description}` : ''}</div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FaEdit /></button>
                <button onClick={() => setDeleteItem(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalItem && (
        <Modal title={modalItem._id ? 'Edit Holiday' : 'Add Holiday'} onClose={() => setModalItem(null)} onSubmit={handleSubmit}>
          <div>
            <label className={labelClass}>Title</label>
            <input className={inputClass} required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Diwali" />
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" className={inputClass} required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Description (optional)</label>
            <input className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Festival of lights" />
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setModalItem(null)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl">Save</button>
          </div>
        </Modal>
      )}

      {deleteItem && <DeleteModal label={deleteItem.title} onCancel={() => setDeleteItem(null)} onConfirm={handleDelete} />}
    </PanelShell>
  );
}

function NewsPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ title: '', image: '', order: 0 });

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await newsService.getNewsClippings());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setModalItem({}); setForm({ title: '', image: '', order: 0 }); };
  const openEdit = (item) => { setModalItem(item); setForm({ title: item.title || '', image: item.image, order: item.order || 0 }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalItem._id) {
      await newsService.updateNewsClipping(modalItem._id, form);
    } else {
      await newsService.addNewsClipping(form);
    }
    setModalItem(null);
    fetchItems();
  };

  const handleDelete = async () => {
    await newsService.deleteNewsClipping(deleteItem._id);
    setDeleteItem(null);
    fetchItems();
  };

  return (
    <PanelShell title="News Clippings" description="Images shown in the homepage News Clipping slider. Add or remove as often as you like — changes show up immediately." onAdd={openAdd} addLabel="Add Clipping">
      {loading ? <Loading /> : items.length === 0 ? <EmptyState label="Add a news clipping image to get started." /> : (
        <div className="grid grid-cols-3 gap-4 p-6">
          {items.map((item) => (
            <div key={item._id} className="relative group border border-slate-200 rounded-xl overflow-hidden">
              <img src={item.image} alt={item.title || 'News clipping'} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => openEdit(item)} className="p-2 bg-white text-blue-600 rounded-lg"><FaEdit /></button>
                <button onClick={() => setDeleteItem(item)} className="p-2 bg-white text-red-600 rounded-lg"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalItem && (
        <Modal title={modalItem._id ? 'Edit Clipping' : 'Add Clipping'} onClose={() => setModalItem(null)} onSubmit={handleSubmit}>
          <div>
            <label className={labelClass}>Title (optional)</label>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Times of India — Aug 9" />
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input className={inputClass} required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://.../clipping.jpg" />
            <p className="text-xs text-slate-400 mt-1">Paste a hosted image link (e.g. uploaded to any image host).</p>
          </div>
          <div>
            <label className={labelClass}>Order (lower shows first)</label>
            <input type="number" className={inputClass} value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setModalItem(null)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl">Save</button>
          </div>
        </Modal>
      )}

      {deleteItem && <DeleteModal label={deleteItem.title || 'This clipping'} onCancel={() => setDeleteItem(null)} onConfirm={handleDelete} />}
    </PanelShell>
  );
}
