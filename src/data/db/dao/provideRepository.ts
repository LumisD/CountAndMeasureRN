import {Realm} from "realm";
import {MeasureAndCountRepositoryImpl} from "../../repository/MeasureAndCountRepositoryImpl";
import {ChipboardDao} from "./ChipboardDao";
import {UnionOfChipboardsDao} from "./UnionOfChipboardsDao";
import {MeasureAndCountRepository} from "../../repository/MeasureAndCountRepository";

export function provideMeasureAndCountRepository(
  realm: Realm,
): MeasureAndCountRepository {
  const chipboardDao = new ChipboardDao(realm);
  const unionDao = new UnionOfChipboardsDao(realm);
  return new MeasureAndCountRepositoryImpl(chipboardDao, unionDao);
}
