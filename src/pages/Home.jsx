"use client";

import { useState } from "react";

import EditableTable from "../components/EditableTable";
import ProductGrid from "../components/ProductGrid";
import MenuBuilder from "../components/MenuBuilder";
import { Table, ShoppingBag, Menu } from "lucide-react";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("table");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "table":
        return <EditableTable />;
      case "products":
        return <ProductGrid />;
      case "menu":
        return <MenuBuilder />;
      default:
        return <EditableTable />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <header className="  shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-[#6e62e5]">Archstore</h1>
          <p className="text-gray-600 mt-1">Frontend Intern Assignment</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
          <div
            className={`cursor-pointer transition-all bg-white py-4 px-6 rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
              activeComponent === "table"
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:shadow-md"
            }`}
          >
            <div className="pb-3" onClick={() => setActiveComponent("table")}>
              <div className="flex items-center gap-2">
                <Table className="h-5 w-5 text-blue-600" />
                <h1 className="text-lg font-semibold">
                  Task 1: Editable Table
                </h1>
              </div>
              <div>
                Interactive data grid with inline editing capabilities or
                seamless data manipulation
              </div>
            </div>
            <div>
              <button
                variant={activeComponent === "table" ? "default" : "outline"}
                className="w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  rounded-2xl py-2 px-4"
                onClick={() => setActiveComponent("table")}
              >
                View Table Component
              </button>
            </div>
          </div>

          <div
            className={`cursor-pointer transition-all py-4 px-6 bg-white rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
              activeComponent === "products"
                ? "ring-2 ring-green-500 bg-green-50"
                : "hover:shadow-md"
            }`}
          >
            <h1 className="pb-3" onClick={() => setActiveComponent("products")}>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-green-600" />
                <h1 className="text-lg font-semibold">Task 2: Product Grid</h1>
              </div>
              <div>E-commerce product cards with add product functionality</div>
            </h1>
            <div>
              <button
                variant={activeComponent === "products" ? "default" : "outline"}
                className="w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  rounded-2xl py-2 px-4"
                onClick={() => setActiveComponent("products")}
              >
                View Product Grid
              </button>
            </div>
          </div>

          <div
            className={`cursor-pointer transition-all py-4 px-6 bg-white rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
              activeComponent === "menu"
                ? "ring-2 ring-purple-500 bg-purple-50"
                : "hover:shadow-md"
            }`}
          >
            <div className="pb-3" onClick={() => setActiveComponent("menu")}>
              <div className="flex items-center gap-2">
                <Menu className="h-5 w-5 text-purple-600" />
                <h1 className="text-lg">Task 3: Menu Builder</h1>
              </div>
              <div>
                Dynamic menu tree with add, edit, and delete functionality
              </div>
            </div>
            <div>
              <button
                variant={activeComponent === "menu" ? "default" : "outline"}
                className="w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  rounded-2xl py-2 px-4"
                onClick={() => setActiveComponent("menu")}
              >
                View Menu Builder
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm  p-6">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
}
