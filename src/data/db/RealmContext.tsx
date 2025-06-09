import React, {createContext, useContext, useEffect, useState} from "react";
import Realm from "realm";
import {ChipboardSchema} from "./schemas/Chipboard";
import {UnionOfChipboardsSchema} from "./schemas/UnionOfChipboards";

const RealmContext = createContext<Realm | null>(null);

export const RealmProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [realm, setRealm] = useState<Realm | null>(null);

  useEffect(() => {
    let isMounted = true;

    Realm.open({
      schema: [ChipboardSchema, UnionOfChipboardsSchema],
      schemaVersion: 1,
    }).then(r => {
      if (isMounted) setRealm(r);
    });

    return () => {
      isMounted = false;
      if (realm && !realm.isClosed) {
        realm.close();
      }
    };
  }, []);

  if (!realm) return null;

  return (
    <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
  );
};

export const useRealm = (): Realm => {
  const ctx = useContext(RealmContext);
  if (!ctx) throw new Error("useRealm must be used inside a RealmProvider");
  return ctx;
};
