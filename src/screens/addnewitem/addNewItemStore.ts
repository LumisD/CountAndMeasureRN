// import {create} from "zustand";
// import {AddNewItemIntent} from "./AddNewItemIntent";
// import {AddNewItemState} from "./AddNewItemState";
// import {AddNewItemEffect} from "./AddNewItemEffect";
// import {ChipboardUi} from "./ChipboardUi";
// import {UnionOfChipboardsUI} from "./UnionOfChipboardsUI";

// // Default state
// const initialState: AddNewItemState = {
//   unionOfChipboards: {} as UnionOfChipboardsUI,
//   createdChipboards: [],
//   newOrEditChipboard: {} as ChipboardUi,
//   isAddAreaOpen: true,
//   isAddButtonAvailable: false,
// };

// interface AddNewItemStore {
//   state: AddNewItemState;
//   currentEffect: AddNewItemEffect | null;
//   processIntent: (intent: AddNewItemIntent) => void;
//   consumeEffect: () => void;
// }

// // Reducer function
// const reducer = (
//   state: AddNewItemState,
//   intent: AddNewItemIntent,
// ): {newState: AddNewItemState; effect?: AddNewItemEffect} => {
//   switch (intent.type) {
//     case "SetItemType":
//       return {
//         newState: {
//           ...state,
//           unionOfChipboards: {
//             ...state.unionOfChipboards,
//             itemType: intent.itemType,
//           },
//         },
//       };

//     case "TitleOfUnionChanged":
//       return {
//         newState: {
//           ...state,
//           unionOfChipboards: {
//             ...state.unionOfChipboards,
//             title: intent.newTitle,
//           },
//         },
//       };

//     case "ToggleAddAreaVisibility":
//       return {
//         newState: {
//           ...state,
//           isAddAreaOpen: !state.isAddAreaOpen,
//         },
//         effect: {type: "FlashAddItemArea"},
//       };

//     case "Back":
//       return {
//         newState: state,
//         effect: {type: "NavigateBack"},
//       };

//     // TODO: implement other intents as needed

//     default:
//       return {newState: state};
//   }
// };

// // Zustand store
// export const useAddNewItemStore = create<AddNewItemStore>((set, get) => ({
//   state: initialState,
//   currentEffect: null,

//   processIntent: intent => {
//     const {newState, effect} = reducer(get().state, intent);
//     set({state: newState});
//     if (effect) {
//       set({currentEffect: effect});
//     }
//   },

//   consumeEffect: () => {
//     set({currentEffect: null});
//   },
// }));
