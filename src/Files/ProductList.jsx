import React, { useState } from "react";

import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useStore } from "./Contextapi";
//import Contextapi, { useStore } from "./Contextapi";
import { Link } from "react-router-dom";
import { deleteProducts } from "../services/api-calls";
// import { useState } from "react";
import { toast } from "react-toastify";

const ProductList = () => {
  // const [model, setModel] = useState(false);
  // const { product } = React.useContext(Contextapi);
  //const { products: product, isLoading, dispatch, mutateProducts } = useStore();
  const { products: product, isLoading, mutateProducts } = useStore();
  // const [id, setId] = useState("");
  //const [id, setId] = useState("");
  // const openModal = () => {
  //   setModel(true);
  // };
  // const closeModal = () => {
  //   setModel(false);
  // };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Customer?")) {
      return;
    }
    try {
      const res = await deleteProducts(id);
      toast.success(res.message);
      mutateProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [query, setQuery] = useState("");
  const filteredProducts = filteredArray(product, query);

  return (
    <div className=" overflow-x-hidden w-screen">
      <div className="flex flex-col">
        <div className="shadow-overflow-hidden sm:rounded-lg mt-12">
          <div className="flex flex-row justify-between"></div>

          <div className="-my-2 sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block sm:px-6 lg:px-8">
              <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className="flex justify-between items-center m-4">
                  <div className="flex items-center">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                      type="search"
                      placeholder="Search"
                      className="outline-none border-b-2 border-gray-400"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <table className="max-w-5xl">
                    <thead className="bg-gray-50">
                      <tr className="">
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Product Name
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Product cost
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Product Quantity
                        </th>

                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          TotalPrice
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Description
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {isLoading && <h1>Loading....</h1>}
                      {filteredProducts?.map((item, index) => {
                        const {
                          _id,
                          name,
                          cost,
                          quantity,
                          description,
                          image,
                          category,
                        } = item;
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={
                                      image ||
                                      "https://www.shopbase.com/blog/wp-content/uploads/2022/05/winning-product-la-gi-1.jpg"
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {name}
                                  </div>
                                  <div className="text-sm text-gray-500"></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {" "}
                                ${cost}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active: {quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${quantity * cost}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {description}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {category?.name}
                            </td>
                            <div className="flex flex-row">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Link to={`/edit-product/${_id}`}>
                                  <button className="text-green-500 hover:text-green-700 font-bold py-2 px-4 rounded-full">
                                    <FaEdit />
                                  </button>
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  className="text-red-600 hover:text-red-700 font-bold py-2 px-4 rounded-full"
                                  onClick={() => deleteProduct(_id)}
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </div>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function filteredArray(arr, query) {
    return arr?.filter((el) => {
      return (
        el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        el.cost.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        el.quantity.toString().toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        el.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        el.category.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
  }
};

export default ProductList;

// <div className="flex flex-col">
// <div className=" shadow-overflow-hidden sm:rounded-lg mt-12">
//   <div className="flex flex-row justify-between"></div>

//   <div className="-my-2  sm:-mx-6 lg:-mx-8">
//     <div className="  py-2 inline-block  sm:px-6 lg:px-8">
//       <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//         <div className="flex justify-between items-center m-4">
//           <div className="flex items-center">
//             <FaSearch className="text-gray-400 mr-2" />
//             <input
//               type="search"
//               placeholder="Search"
//               className="outline-none  border-b-2 border-gray-400 "
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         <table className="w-80 divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr className=" ">
//               <th
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 scope="col"
//               >
//                 Product Name
//               </th>
//               <th
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 scope="col"
//               >
//                 Product cost
//               </th>
//               <th
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 scope="col"
//               >
//                 Product Quantity
//               </th>
//               <th
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 scope="col"
//               >
//                 TotalPrice
//               </th>
//               <th
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 scope="col"
//               >
//                 description
//               </th>

//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {isLoading && <h1>Loading....</h1>}
//             {filteredProducts?.map((item, index) => {
//               const {
//                 _id,
//                 name,
//                 cost,
//                 quantity,
//                 description,
//                 image,
//                 category,
//               } = item;
//               return (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={
//                             image ||
//                             "https://www.shopbase.com/blog/wp-content/uploads/2022/05/winning-product-la-gi-1.jpg"
//                           }
//                           alt=""
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {name}
//                         </div>
//                         <div className="text-sm text-gray-500"></div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900"> ${cost}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                       Active: {quantity}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ${quantity * cost}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {description}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {category?.name}
//                   </td>
//                   <div className="flex flex-row">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <Link to={`/edit-product/${_id}`}>
//                         <button
//                           className="text-green-500 hover:text-green-700  font-bold py-2 px-4 rounded-full"
//                           // onClick={openModal}
//                         >
//                           <FaEdit />
//                         </button>
//                       </Link>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <button
//                         className="text-red-600 hover:text-red-700  font-bold py-2 px-4 rounded-full"
//                         onClick={() => deleteProduct(_id)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </div>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
