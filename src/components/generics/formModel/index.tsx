//Form modeli – keyof + indeksli erişim (T[K])
//Hedefimiz: tek bir hook ile modelinizi tip güvenli yönetmek; alan adını (keyof T) ve o alanın değer tipini (T[K]) doğru bağlamak.

import * as React from "react";
import { useCallback ,useState} from "react";

export function useFormModel<T extends object>(initial: T) {
  const [model, setModel] = React.useState<T>(initial);

  // Tek alan güncelle: alan adı tipli, değer tipi alanla eşleşir
  const setField = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setModel((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Birden çok alan güncelle (patch)
  const setMany = useCallback((patch: Partial<T>) => {
    setModel((prev) => ({ ...prev, ...patch }));
  }, []);

  // Tam reset
  const reset = useCallback((next?: T) => {
    setModel(next ?? initial);
  }, [initial]);

  // (opsiyonel) touched izleme (hangi alanlara dokunuldu)
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const markTouched = useCallback(
    <K extends keyof T>(key: K) => setTouched((t) => ({ ...t, [key]: true })),
    []
  );

  // (opsiyonel) basit shallow equal
  const shallowEqual = (a: T, b: T) =>
    (Object.keys(a) as Array<keyof T>).every((k) => Object.is(a[k], b[k]));
  const dirty = React.useMemo(() => !shallowEqual(model, initial), [model, initial]);

  return { model, setField, setMany, reset, touched, markTouched, dirty, setModel };
}


