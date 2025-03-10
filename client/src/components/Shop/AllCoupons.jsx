import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
const AllCoupons = () => {
  const [name, setName] = useState("");
  const [minAmmount, setMinAmmount] = useState("");
  const [value, setValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [maxAmmount, setMaxAmmount] = useState("");
  const [open, setOpen] = useState(false);
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupun-code`,
        {
          name,
          minAmmount,
          maxAmmount,
          selectedProducts,
          value,
          shop: seller,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: 10,
        // sold: item?.sold_out,
      });
    });
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <div className="w-full flex justify-end ">
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !h-[45px] !rounded-[5px] !w-[180px] mr-3 px-3 mb-3`}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000020] z-[2000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh]  p-4 rounded-md bg-white shadow-sm relative">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupons Code
                </h5>
                {/* Create Coupon Code Form */}
                <form onSubmit={handleSubmit} areia-required="true">
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm capitalize"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Coupon Code Name... "
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentage:{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm capitalize"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter Your Coupon Code Value... "
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Minimum Ammount: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="minAmmount"
                      value={minAmmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm capitalize"
                      onChange={(e) => setMinAmmount(e.target.value)}
                      placeholder="Enter Your Coupon Code Minimum Ammount... "
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Maximum Ammount: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="maxAmmount"
                      value={maxAmmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm capitalize"
                      onChange={(e) => setMaxAmmount(e.target.value)}
                      placeholder="Enter Your Coupon Code Maximum Ammount... "
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Selected Products</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px] capitalize
                      "
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose a category">
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default AllCoupons;
