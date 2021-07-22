import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompanies = createAsyncThunk("/fetchCompanies", async () => {
  const response = await axios.get("http://localhost:8000/companies");
  return response.data;
});

export const fetchItems = createAsyncThunk("/fetchItems", async () => {
  const response = await axios.get("http://localhost:8000/items");
  return response.data;
});

const BrandFilterFunction = (items, Filter) => {
  return items.filter((item) => Filter.SearchVal.includes(item.manufacturer));
};
const TagFilterFunction = (items, Filter) => {
  return items.filter((item) =>
    item.tags.some((tag) => Filter.SearchVal.includes(tag))
  );
};
const ItemTypeFilterFunction = (items, Filter) => {
  return items.filter((item) =>
    Filter.toString()
      .toLocaleLowerCase("tr-TR")
      .includes(item.itemType.toString().toLocaleLowerCase("tr-TR"))
  );
};

const SortHelper = (option, items) => {
  switch (option) {
    case "SortItemsAscendingByPrice": {
      return SortItemsAscendingByPrice(items);
    }
    case "SortItemsDescendingByPrice": {
      return SortItemsDescendingByPrice(items);
    }
    case "SortItemsDescendingByDate": {
      return SortItemsDescendingByDate(items);
    }
    case "SortItemsAscendingByDate": {
      return SortItemsAscendingByDate(items);
    }
    default: {
      console.log("Invalid choice");
      break;
    }
  }
};

const SortItemsAscendingByPrice = (items) => {
  return items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};
const SortItemsDescendingByPrice = (items) => {
  return items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
};
const SortItemsAscendingByDate = (items) => {
  return items.sort((a, b) => parseFloat(a.added) - parseFloat(b.added));
};
const SortItemsDescendingByDate = (items) => {
  return items.sort((a, b) => parseFloat(b.added) - parseFloat(a.added));
};

const shoppingSlice = createSlice({
  name: "Shopping",
  initialState: {
    loading: false,
    items: [],
    filters: [],
    filteredItems: [],
    tags: [],
    brands: [],
    addedItems: [],
    itemTypes: [],
    sortingOption: "SortItemsAscendingByPrice",
    ActiveChipFilter: "Mug",
    totalPrice: 0,
    error: "",
  },
  reducers: {
    SetSortingOption(state, action) {
      state.sortingOption = action.payload;
      state.filteredItems = SortHelper(
        state.sortingOption,
        state.filteredItems
      );
    },
    SetActiveChipFilter(state, action) {
      state.ActiveChipFilter = action.payload;
      state.filteredItems = ItemTypeFilterFunction(state.filteredItems, action.payload);
    },
    AddFilter(state, action) {
      state.filters.push(action.payload);
      let NewItemList = [];
      state.filters.forEach((Filter) => {
        if (Filter.Type === "Brand") {
          NewItemList = NewItemList.concat(
            BrandFilterFunction(state.items, Filter)
          );
        } else if (Filter.Type === "Tag") {
          NewItemList = NewItemList.concat(
            TagFilterFunction(state.items, Filter)
          );
        }
      });
      state.filteredItems = SortHelper(
        state.sortingOption,
        NewItemList.filter(
          (v, i, a) =>
            a.findIndex((t) => t.Type === v.Type && t.index === v.index) === i
        )
      );
      state.filteredItems = ItemTypeFilterFunction(
        state.filteredItems,
        state.ActiveChipFilter
      );
    },
    RemoveFilter(state, action) {
      state.filters = state.filters.filter(
        (item) =>
          item.index !== action.payload.index &&
          item.Type !== action.payload.Type
      );
      if (state.filters.length === 0) {
        state.filteredItems = state.items;
      } else {
        let NewItemList = [];
        state.filters.forEach((Filter) => {
          if (Filter.Type === "Brand") {
            NewItemList = NewItemList.concat(
              BrandFilterFunction(state.items, Filter)
            );
          } else if (Filter.Type === "Tag") {
            NewItemList = NewItemList.concat(
              TagFilterFunction(state.items, Filter)
            );
          }
        });

        state.filteredItems = SortHelper(
          state.sortingOption,
          NewItemList.filter(
            (v, i, a) =>
              a.findIndex((t) => t.Type === v.Type && t.index === v.index) === i
          )
        );

        state.filteredItems = ItemTypeFilterFunction(
          state.filteredItems,
          state.ActiveChipFilter
        );
      }
    },

    AddItem(state, action) {
      state.totalPrice = state.totalPrice + action.payload.price;

      const existingBasketItemIndex = state.addedItems.findIndex(
        (item) => item.index === action.payload.index
      );
      const existingBasketItem = state.addedItems[existingBasketItemIndex];

      if (existingBasketItem) {
        const updatedItem = {
          ...existingBasketItem,
          amount: existingBasketItem.amount + 1,
        };
        state.addedItems[existingBasketItemIndex] = updatedItem;
      } else {
        const newItem = {
          ...action.payload,
          amount: 1,
        };

        state.addedItems.push(newItem);
      }
    },
    AddItemFromBasket(state, action) {
      const existingBasketItemIndex = state.addedItems.findIndex(
        (item) => item.index === action.payload.index
      );

      const existingBasketItem = state.addedItems[existingBasketItemIndex];

      if (existingBasketItem) {
        const updatedItem = {
          ...existingBasketItem,
          amount: existingBasketItem.amount + 1,
        };
        state.addedItems[existingBasketItemIndex] = updatedItem;
      }
      state.totalPrice = state.totalPrice + action.payload.price;
    },
    RemoveItemFromBasket(state, action) {
      state.totalPrice = state.totalPrice - action.payload.price;

      const existingBasketItemIndex = state.addedItems.findIndex(
        (item) => item.index === action.payload.index
      );

      const existingBasketItem = state.addedItems[existingBasketItemIndex];
      let updatedItems;
      if (existingBasketItem.amount === 1) {
        updatedItems = state.addedItems.filter(
          (item) => item.index !== action.payload.index
        );
      } else {
        const updatedItem = {
          ...existingBasketItem,
          amount: existingBasketItem.amount - 1,
        };
        updatedItems = [...state.addedItems];
        updatedItems[existingBasketItemIndex] = updatedItem;
      }
      state.addedItems = updatedItems;
    },
  },
  extraReducers: {
    [fetchCompanies.pending]: (state) => {
      state.loading = true;
    },
    [fetchCompanies.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [fetchCompanies.fulfilled]: (state, action) => {
      state.brands = action.payload;

      state.brands = state.brands.map((item, index) => ({
        Id: index + 1,
        Name: item.name,
        SearchVal: item.slug,
        Type: "Brand",
        Count: state.items.filter((obj) => obj.manufacturer === item.slug)
          .length,
      }));

      state.brands = [
        {
          Id: 0,
          Name: "All",
          Type: "Brand",
          SearchVal: "All",
          Count: state.items.length,
        },
      ].concat(state.brands);

      state.loading = false;
    },
    [fetchItems.pending]: (state) => {
      state.loading = true;
    },
    [fetchItems.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.loading = true;

      state.items = action.payload.map((item, i) => ({
        ...item,
        index: i,
      }));
      state.filteredItems = SortItemsAscendingByPrice(state.items);
      state.filteredItems = ItemTypeFilterFunction(state.items, state.ActiveChipFilter);

      state.tags = action.payload
        .map((item) => item.tags)
        .reduce((prev, current) => [...prev, ...current]);

      state.tags = [...new Set(state.tags)].map((tag, index) => ({
        Id: index + 1,
        Name: tag,
        SearchVal: tag,
        Type: "Tag",
        Count: state.tags.filter((y) => y === tag).length,
      }));

      state.tags = [
        {
          Id: 0,
          Name: "All",
          Type: "Tag",
          SearchVal: "All",
          Count: state.items.length,
        },
      ].concat(state.tags);

      state.itemTypes = [...new Set(state.items.map((item) => item.itemType))];

      state.loading = false;
    },
  },
});

export const shoppingActions = shoppingSlice.actions;

export default shoppingSlice;
