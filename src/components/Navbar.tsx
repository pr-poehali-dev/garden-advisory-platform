import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Navbar = () => {
  return (
    <header className="bg-primary-400 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon name="Flower2" className="h-6 w-6" />
            <span className="font-playfair text-xl font-bold">ЗеленыйСад</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/plants">Растения</NavLink>
            <NavLink to="/calendar">Календарь посадки</NavLink>
            <NavLink to="/tips">Советы</NavLink>
            <NavLink to="/marketplace">Маркет</NavLink>
            <NavLink to="/community">Сообщество</NavLink>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-white">
              <Icon name="Search" className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-primary-300"
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <Link
      to={to}
      className="text-white hover:text-primary-100 transition-colors font-medium"
    >
      {children}
    </Link>
  );
};

export default Navbar;
