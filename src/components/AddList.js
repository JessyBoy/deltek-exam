import React from "react";

function AddList({ handleSubmit, onSubmit, register, errors }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="pb-4">
          <div className="text-xl font-semibold">Contact name:</div>
          <div>
            <input
              name="name"
              ref={register({ required: true, minLength: 5 })}
              className="px-2 py-2 mr-4 border-2 border-black focus:outline-none"
              placeholder="Contact name..."
            />
          </div>
          {errors.name?.type === "required" && (
            <div className="py-2 font-semibold text-red-400">
              Contact name is required
            </div>
          )}
        </div>

        <div className="pb-4">
          <div className="text-xl font-semibold">Contact details:</div>
          <div>
            <textarea
              name="description"
              ref={register({ required: true, minLength: 5 })}
              className="w-full px-2 py-2 mr-4 border-2 border-black focus:outline-none"
              placeholder="Contact details"
            ></textarea>
          </div>
          {errors.name?.type === "required" && (
            <div className="py-2 font-semibold text-red-400">
              Contact details is required
            </div>
          )}
        </div>

        <div className="w-1/5 duration-200 ease-in transform border-2 border-black hover:bg-green-400 hover:text-white hover:border-green-400">
          <button
            type="submit"
            className="w-full py-2 text-xl font-semibold focus:outline-none"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddList;
