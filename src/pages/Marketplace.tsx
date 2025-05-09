
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discount?: number;
  image: string;
  rating: number;
  seller: string;
  isNew?: boolean;
  inStock: boolean;
  isBestseller?: boolean;
}

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");

  // Категории товаров
  const categories = [
    { id: "seeds", label: "Семена" },
    { id: "seedlings", label: "Рассада" },
    { id: "soils", label: "Почвы и удобрения" },
    { id: "tools", label: "Инструменты" },
    { id: "pots", label: "Горшки и кашпо" },
    { id: "protection", label: "Защита растений" },
    { id: "books", label: "Книги и пособия" },
  ];

  // Пример данных товаров
  const products: Product[] = [
    {
      id: 1,
      name: "Семена томата 'Черри Ред'",
      category: "seeds",
      price: 120,
      image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      seller: "ГринСид",
      inStock: true,
      isBestseller: true
    },
    {
      id: 2,
      name: "Универсальный грунт 'ЭкоЗемля'",
      category: "soils",
      price: 450,
      image: "https://images.unsplash.com/photo-1585315073558-92e96aabf8e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      seller: "ЭкоМир",
      inStock: true
    },
    {
      id: 3,
      name: "Рассада перца 'Болгарский'",
      category: "seedlings",
      price: 200,
      discount: 160,
      image: "https://images.unsplash.com/photo-1615300236079-4bdb43bd9a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.2,
      seller: "СадЭксперт",
      isNew: true,
      inStock: true
    },
    {
      id: 4,
      name: "Секатор садовый премиум",
      category: "tools",
      price: 1200,
      image: "https://images.unsplash.com/photo-1623222481284-d2ad8fadf8f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      seller: "Инструмент-Про",
      inStock: true,
      isBestseller: true
    },
    {
      id: 5,
      name: "Керамический горшок 'Терракота'",
      category: "pots",
      price: 550,
      discount: 450,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      seller: "ДомСад",
      inStock: true
    },
    {
      id: 6,
      name: "Биозащита от вредителей",
      category: "protection",
      price: 380,
      image: "https://images.unsplash.com/photo-1611048268679-d57a2d86307d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      seller: "ЭкоЗащита",
      isNew: true,
      inStock: true
    },
    {
      id: 7,
      name: "Книга 'Органическое земледелие'",
      category: "books",
      price: 790,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      seller: "Садовая Библиотека",
      inStock: true
    },
    {
      id: 8,
      name: "Рассада клубники 'Виктория'",
      category: "seedlings",
      price: 350,
      image: "https://images.unsplash.com/photo-1626633977495-0f90759a1a4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      seller: "Ягодный Мир",
      inStock: false
    },
  ];

  // Фильтрация продуктов по категориям и поиску
  const filteredProducts = products.filter(product => {
    // Фильтр по поиску
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Фильтр по категориям
    const matchesCategory = selectedCategories.length === 0 || 
                          selectedCategories.includes(product.category);
    
    // Фильтр по цене
    const matchesPrice = product.price >= priceRange[0] && 
                        product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Сортировка продуктов
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case "popularity":
        return (b.rating || 0) - (a.rating || 0);
      case "priceAsc":
        const priceA = a.discount || a.price;
        const priceB = b.discount || b.price;
        return priceA - priceB;
      case "priceDesc":
        const priceADesc = a.discount || a.price;
        const priceBDesc = b.discount || b.price;
        return priceBDesc - priceADesc;
      case "newest":
        return (a.isNew ? 1 : 0) - (b.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-500">Маркет для садоводов</h1>
          <Button variant="outline" className="flex items-center">
            <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
            Корзина (0)
          </Button>
        </div>

        {/* Поисковая строка */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Боковая панель фильтров */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg border border-primary-100 p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4">Фильтры</h3>
              
              {/* Категории */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Категории</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox 
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Диапазон цен */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Цена</h4>
                <div className="mt-6 px-1">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{priceRange[0]} ₽</span>
                    <span>{priceRange[1]} ₽</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Сортировка */}
              <div>
                <h4 className="font-medium mb-2">Сортировка</h4>
                <RadioGroup value={sortBy} onValueChange={setSortBy}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="popularity" id="sort-popularity" />
                    <Label htmlFor="sort-popularity">По популярности</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="priceAsc" id="sort-price-asc" />
                    <Label htmlFor="sort-price-asc">Сначала дешевле</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="priceDesc" id="sort-price-desc" />
                    <Label htmlFor="sort-price-desc">Сначала дороже</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="sort-newest" />
                    <Label htmlFor="sort-newest">Новинки</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator className="my-4" />
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                  setPriceRange([0, 5000]);
                  setSortBy("popularity");
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>
          
          {/* Основное содержимое маркета */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="SearchX" className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска или фильтрации</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Баннер подписки на рассылку */}
      <div className="bg-primary-100/30 py-10 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Подпишитесь на обновления маркета</h3>
            <p className="text-gray-600 mb-6">Получайте уведомления о новинках, акциях и сезонных скидках!</p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Ваш email"
                className="rounded-r-none"
              />
              <Button className="rounded-l-none">Подписаться</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden border border-primary-100 hover:shadow-md transition-shadow">
      <div className="relative pt-[100%]">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-blue-500">Новинка</Badge>
        )}
        {product.isBestseller && (
          <Badge className="absolute top-3 left-3 bg-orange-500">Хит продаж</Badge>
        )}
        {product.discount && (
          <Badge className="absolute top-3 right-3 bg-red-500">
            -{Math.round((1 - product.discount / product.price) * 100)}%
          </Badge>
        )}
      </div>
      
      <CardContent className="pt-4">
        <div className="flex items-center mb-1 text-sm text-gray-500">
          <span>{product.seller}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Icon name="Star" className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-medium line-clamp-2 mb-1 h-12">{product.name}</h3>
        
        <div className="flex items-center mt-2">
          {product.discount ? (
            <>
              <span className="text-lg font-bold">{product.discount} ₽</span>
              <span className="ml-2 text-sm text-gray-500 line-through">{product.price} ₽</span>
            </>
          ) : (
            <span className="text-lg font-bold">{product.price} ₽</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <Button 
          className="w-full"
          variant={product.inStock ? "default" : "outline"}
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <>
              <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
              В корзину
            </>
          ) : "Нет в наличии"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Marketplace;
</script>
