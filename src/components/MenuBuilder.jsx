"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
} from "lucide-react";

const initialMenus = [
  {
    id: "main-menu",
    name: "Main Navigation",
    items: [
      {
        id: "home",
        name: "Home",
        children: [],
      },
      {
        id: "products",
        name: "Products",
        children: [
          {
            id: "electronics",
            name: "Electronics",
            children: [
              { id: "phones", name: "Phones", children: [] },
              { id: "laptops", name: "Laptops", children: [] },
            ],
          },
          {
            id: "clothing",
            name: "Clothing",
            children: [
              { id: "mens", name: "Men's", children: [] },
              { id: "womens", name: "Women's", children: [] },
            ],
          },
        ],
      },
      {
        id: "services",
        name: "Services",
        children: [
          { id: "support", name: "Support", children: [] },
          { id: "consulting", name: "Consulting", children: [] },
        ],
      },
      {
        id: "about",
        name: "About",
        children: [],
      },
    ],
  },
  {
    id: "footer-menu",
    name: "Footer Links",
    items: [
      {
        id: "company",
        name: "Company",
        children: [
          { id: "careers", name: "Careers", children: [] },
          { id: "press", name: "Press", children: [] },
        ],
      },
      {
        id: "legal",
        name: "Legal",
        children: [
          { id: "privacy", name: "Privacy Policy", children: [] },
          { id: "terms", name: "Terms of Service", children: [] },
        ],
      },
    ],
  },
];

export default function MenuBuilder() {
  const [menus, setMenus] = useState(initialMenus);
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newMenuName, setNewMenuName] = useState("");
  const [showNewMenuForm, setShowNewMenuForm] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const findItemById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item;
      const found = findItemById(item.children, id);
      if (found) return found;
    }
    return null;
  };

  const updateItemInTree = (items, id, updates) => {
    return items.map((item) => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return {
        ...item,
        children: updateItemInTree(item.children, id, updates),
      };
    });
  };

  const removeItemFromTree = (items, id) => {
    return items
      .filter((item) => item.id !== id)
      .map((item) => ({
        ...item,
        children: removeItemFromTree(item.children, id),
      }));
  };

  const addItemToTree = (items, parentId, newItem) => {
    if (parentId === null) {
      return [...items, newItem];
    }

    return items.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...item.children, newItem],
        };
      }
      return {
        ...item,
        children: addItemToTree(item.children, parentId, newItem),
      };
    });
  };

  const handleEditItem = (menuId, itemId, currentName) => {
    setEditingItem({ menuId, itemId });
    setEditValue(currentName);
  };

  const handleSaveEdit = () => {
    if (!editingItem || !editValue.trim()) return;

    setMenus((prev) =>
      prev.map((menu) => {
        if (menu.id === editingItem.menuId) {
          return {
            ...menu,
            items: updateItemInTree(menu.items, editingItem.itemId, {
              name: editValue.trim(),
            }),
          };
        }
        return menu;
      })
    );

    setEditingItem(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditValue("");
  };

  const handleDeleteItem = (menuId, itemId) => {
    setMenus((prev) =>
      prev.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            items: removeItemFromTree(menu.items, itemId),
          };
        }
        return menu;
      })
    );
  };

  const handleAddItem = (menuId, parentId, name) => {
    const newItem = {
      id: generateId(),
      name: name.trim(),
      children: [],
    };

    setMenus((prev) =>
      prev.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            items: addItemToTree(menu.items, parentId, newItem),
          };
        }
        return menu;
      })
    );
  };

  const handleToggleExpand = (menuId, itemId) => {
    setMenus((prev) =>
      prev.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            items: updateItemInTree(menu.items, itemId, {
              isExpanded: !findItemById(menu.items, itemId)?.isExpanded,
            }),
          };
        }
        return menu;
      })
    );
  };

  const handleAddMenu = () => {
    if (!newMenuName.trim()) return;

    const newMenu = {
      id: generateId(),
      name: newMenuName.trim(),
      items: [],
    };

    setMenus((prev) => [...prev, newMenu]);
    setNewMenuName("");
    setShowNewMenuForm(false);
  };

  const handleDeleteMenu = (menuId) => {
    setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
  };

  const renderMenuItem = (item, menuId, depth = 0) => {
    const isEditing =
      editingItem?.menuId === menuId && editingItem?.itemId === item.id;
    const hasChildren = item.children.length > 0;
    const isExpanded = item.isExpanded;

    return (
      <div key={item.id} className="space-y-1">
        <div
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group"
          style={{ marginLeft: `${depth * 20}px` }}
        >
          {hasChildren ? (
            <button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => handleToggleExpand(menuId, item.id)}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}

          <div className="flex items-center gap-2 flex-1">
            {hasChildren ? (
              isExpanded ? (
                <FolderOpen className="h-4 w-4 text-blue-600" />
              ) : (
                <Folder className="h-4 w-4 text-blue-600" />
              )
            ) : (
              <div className="w-4 h-4 rounded-full bg-gray-300" />
            )}

            {isEditing ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="h-8 flex-1"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                />
                <button size="sm" variant="ghost" onClick={handleSaveEdit}>
                  <Save className="h-3 w-3" />
                </button>
                <button size="sm" variant="ghost" onClick={handleCancelEdit}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 font-medium">{item.name}</span>
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                  <button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      const name = prompt("Enter new item name:");
                      if (name?.trim()) {
                        handleAddItem(menuId, item.id, name);
                      }
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => handleEditItem(menuId, item.id, item.name)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteItem(menuId, item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {item.children.map((child) =>
              renderMenuItem(child, menuId, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu Builder</h2>
          <p className="text-gray-600">
            Create and manage navigation menus with nested categories
          </p>
        </div>
        <button
          onClick={() => setShowNewMenuForm(true)}
          className="flex items-center gap-2 bg-[#6e62e5] py-2 px-2 rounded-lg text-white"
        >
          <Plus className="h-4 w-4 " />
          Add New Menu
        </button>
      </div>

      {showNewMenuForm && (
        <div>
          <h1 className="text-sm font-bold text-gray-900">Create New Menu</h1>
          <div>
            <div className="flex gap-3 pr-96">
              <input
                value={newMenuName}
                onChange={(e) => setNewMenuName(e.target.value)}
                placeholder="Enter menu name"
                className="flex-1 px-2 py-2 border-[1px] border-gray-400 rounded-lg"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddMenu();
                  if (e.key === "Escape") setShowNewMenuForm(false);
                }}
              />
              <button
                className="bg-[#6e62e5] cursor-pointer text-white px-2 py-2 rounded-lg"
                onClick={handleAddMenu}
              >
                Create
              </button>
              <button
                className="bg-red-500 cursor-pointer text-white px-2 py-2 rounded-lg"
                onClick={() => setShowNewMenuForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {menus.map((menu) => (
          <div key={menu.id}>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-blue-600" />
                  <h1 className="text-lg">{menu.name}</h1>
                  <span variant="outline">{menu.items.length} items</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const name = prompt("Enter new item name:");
                      if (name?.trim()) {
                        handleAddItem(menu.id, null, name);
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      if (confirm(`Delete menu "${menu.name}"?`)) {
                        handleDeleteMenu(menu.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {menu.items.length > 0 ? (
                  menu.items.map((item) => renderMenuItem(item, menu.id))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No menu items yet</p>
                    <button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => {
                        const name = prompt("Enter new item name:");
                        if (name?.trim()) {
                          handleAddItem(menu.id, null, name);
                        }
                      }}
                    >
                      Add First Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {menus.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 text-lg mb-4">No menus created yet</p>
          <button onClick={() => setShowNewMenuForm(true)}>
            Create Your First Menu
          </button>
        </div>
      )}
    </div>
  );
}
