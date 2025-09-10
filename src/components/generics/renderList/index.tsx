import { Key, ReactNode } from "react";

//Burada amaç aynı liste komponentini farklı veri tipleriyle (User, Product, Order…) güvenle kullanmak.
// Bir kez List yaz, her tipte (User/Product/…) kullan.
// Satırın nasıl görüneceğini tüketici belirlesin (render fonksiyonu).
// Tıklama vb. olaylarda doğru tipte item gelsin (derlemede hata yakalansın).

// "id" zorunluluğu: map'lerken stabil key gerekir
type ListProps<T extends { id: Key }> = {
  items: readonly T[];
  render: (item: T, index: number) => ReactNode;
  // keySelector: (item: T, index: number) => Key;
  // children: (item: T, index: number) => React.ReactNode;
  onItemClick?: (item: T, index: number, e: React.MouseEvent<HTMLLIElement>) => void;
  className?: string;
};

export const List = <T extends { id: Key },>({
  items,
  render,
  onItemClick,
  className,
}: ListProps<T>) => {
  return (
    <ul className={className}>
      {items.map((it, i) => (
        <li
          key={it.id}
          // key={keySelector(it,i)}
          onClick={onItemClick ? (e) => onItemClick(it, i, e) : undefined}
        >
          {render(it, i)}
          {/* {children(it, i)} */}
        </li>
      ))}
    </ul>
  );
};

// Önemli: Arrow component’te <T,> yaz (virgül, TSX parser’ını rahatlatır), <T> parse hatası → <T,> kullan.
