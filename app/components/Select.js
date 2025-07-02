'use client'

export function SelectMenu({ items, label, formId, handler }) {
  console.log(handler);
  const handleClick = async () => {
    const stuff = await handler();
    console.log(stuff);
  }

  return (
    <>
      <label
        className="block text-gray-300 text-sm font-medium mb-1"
        htmlFor={formId}
      >
        {label}
      </label>
      <div>
        <select id={formId} name={formId} className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm">
          <option value="">Select an option</option>
          {items.map((item) => {
            return (
              <option 
                key={item.value} 
                value={item.value}
                onChange={handleClick}
                >
                {item.label}
              </option>
            );
          })}
          ;
        </select>
      </div>
    </>
  );
}

export default SelectMenu;
