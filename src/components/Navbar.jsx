
import Logo from './navigation/Logo';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-dark-gray/95 backdrop-blur-md border-dark-green">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavLinks />
          <NavIcons />
        </div>
      </div>
    </nav>
  );
}