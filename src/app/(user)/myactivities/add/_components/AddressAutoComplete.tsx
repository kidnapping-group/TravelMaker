"use client";

import { Button } from "@/components/Button";
import Modal, { closeModal, openModal } from "@/components/Modal";
import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

interface AddressAutoCompleteProps {
  address: string;
  setAddress: (address: string) => void;
}

export default function AddressAutoComplete({ address, setAddress }: AddressAutoCompleteProps) {
  const [location, setLocation] = useState<string>("");

  const HandleLocationChange = (lc: string) => {
    setLocation(lc);
  };

  const handleSelect = (lt: string) => {
    setAddress(lt);
    geocodeByAddress(lt).then(results => getLatLng(results[0]));
    closeModal();
  };

  return (
    <div>
      <div className="mb-2.5 text-xl font-bold">주소</div>
      <div className="mb-8 flex items-center">
        <input
          value={address}
          className="mr-3 h-14 w-full rounded-[4px] border border-gray-500 p-4"
          placeholder="주소를 검색하세요"
        />

        <Button onClick={openModal} type="button" size="large">
          검색
        </Button>
      </div>
      <Modal title="주소 입력">
        <PlacesAutocomplete
          value={location}
          onChange={HandleLocationChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="px-6">
              <input
                {...getInputProps({
                  placeholder: "주소를 검색하세요.",
                  className:
                    "px-2 flex h-12 w-full mb-2 items-center rounded-lg bg-gray-100 text-left text-md font-medium text-black outline-none transition-colors hover:bg-gray-200 active:bg-gray-300",
                })}
              />
              <div className="h-72">
                {loading && <div>주소 검색중 ...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  const { key, ...restProps } = getSuggestionItemProps(suggestion, {
                    className,
                  });
                  return (
                    <div
                      key={key}
                      {...restProps}
                      className="flex h-12 shrink-0 items-center rounded-lg px-2 text-left text-md hover:bg-gray-100 hover:text-primary-500 focus:bg-gray-100 active:bg-gray-200"
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </Modal>
    </div>
  );
}
