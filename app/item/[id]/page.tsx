"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import DescriptionSkeleton from "@/components/DescriptionSkeleton";
import { cartStore } from "@/store/store";

const page = ({
  params,
}: {
  params: {
    id: String;
    title: String;
    description: String;
    available: Boolean;
    price: Number;
  };
}) => {
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState(false);
  const cart = cartStore((state) => state.cart);
  const addToCart = cartStore((state) => state.addToCart);
  const removeFromCart = cartStore((state) => state.removeFromCart);
  const img = [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0ODg8NDQ8NDw0NEA8PDQ8PDRANDQ0NFREWFhURFRUYHSggGBolGxMTITEhJSk3Li4uFx8/ODMsQygtOisBCgoKDg0OGhAQGS0lICUtLS0tLSsrLS0uKy0rLS0tLSsvLTAtLS4vLy0rLS0tListKy8rLTc1LS0rKy0tLS0tLv/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAAAQIFCAQGBwP/xABEEAACAQMBBAYECgcIAwAAAAAAAQIDBBEFBhIhMQcyQVFhcROBkbEUIkJScnSCobPBFSMkYmSSsiVzk6KjwtHhMzVU/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAEFAgMEBv/EADARAQACAQIEBAQGAgMAAAAAAAABAgMRMQQSIXEyM0GRE1GhsQUiUmHR8BThQoHB/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj9a1u0safpbutClF8Ip8ZzfdGK4yfkbMeK+SdKwxteKxrLoVv0v0HWnGpZ1o0FLFOpCpCdVx75QeEvVJndP4dbTpbq0f5Ma7M/b9JOjTXG4nTfdO3rLHrUWvvNE8Fmj0+sM4z0n1cl7faNz+GU/8Oq37N0x/xM36U/Gp83Cuek7RodWrVqvup29RZ9c0kZxwOafT6oniKOt6r0wrDVnaPPZO5qJJP6EM5/mRvp+Hfrt7f3/xrniflC2yPSwqjdLVIxgvk3NKEtzi+U4cX617O0ZuA9cftJTiPSz0+1uadaEatGcKlOazCcJKcJLvTXMrZrNZ0l0xOuz6kJAAAAAAAAAAAAAAAAAAAA+Vzc0qMHUrThTpx606k1CC82+BMVmZ0hEzEbun6x0n6Tb5jSnO6qLsoQzDP95LEWvLJ104HLbfp3arZ6Rt1dF1jpX1GtmNtCjaQfJpenrL7Ulu/wCU7cfAY6+Lr9P77tFuItO3R0i7uq1ao61epUq1Zc51Juc34ZfZ4HZWsVjSI6NMzrOsvlJcd5Z48zJC8WEMppOku5pXdVTUPgdB12t3e9Ik8bucrHnxNd8nJNY03nRlEaxM/Ji5PBsYvjJJ+P3kJfTGFjtZIyGha/e6fPfs606eX8en1qNT6UHwb8efiasmKmSNLQyrea7PRdG6YI4Ub+1afDNW2lvRfj6OTyv5mcGT8O/RPu6K8T+qHfdD2n0+/X7LcU5y7abbp1l5wliXrxg4cmDJj8UN9clbbSzBqZgAAAAAAAAAAAAAAADo+3fSDS0/Nva7la95STeaVt41Mc5fur144Z7eG4Scn5rdI+7RkzRXpG7xnV9Wu72p6W7rVK0+O7vP4kM9kIrhFeSLemOtI0rGjjtabTrLhKJmgcQIIFoskHT+a8e4DKaLqfwajfUpwqSd3bOhTdN091TeevvPO7x7OPA0Zcdr2pMTtOvdnS0RFomN49mJVOb54Xrz7jcwXUEvMkVbAEBukhhpprg08prg0+9PsA71sj0lXlpKNK9lK6teCcpfGuaS+cpfLXhLj49/Dn4Kl41p0n6N+PPNfF1h7TYX1G5pQr29SNWjUWYTi8pr8n4dhUWrNZ0tHV2RMTGsOQYpAAAAAAAAAAAAA6p0hbVrTLZKlh3dxmNCL4qCXWqyXcsrC7W14nVwvD/Ft12jf+GnNk5I6bvAqrblKUm5Sk3KUm8uUm8tvvecl64RIIWSAjADAEOmEiyghZSAhyAhpvyCRQQQnAE4AhoCrQS7V0e7Uy0y4fpHJ2ddqNxFcfRvsrJd67e9d+EcvFcP8WvTeNv4bMWTkn9nvtOcZRUotSjJKUZJ5UotZTT7iimNFgsAAAAAAAAAAAK1KkYRc5NRjFOUm+CjFLLbERr0GuO1Oty1C9q3Us7knu0Iv5FCOdyPh2t+Mmeiw4oxUiv91Vt7c1tWJkjawAJAAQBIE4AjADAEgQBAEgGgK4At2AeudEG0vpaT02tL9ZbxcrZt8Z0M8YecW/Y13FTx+DSfiR679/8Abs4fJrHLL0krnSAAAAAAAAAAHSOlnWvg2nu3g8Vb1ukuPFUVxqP2Yj9s7eBxc2TmnaPv6NHEX0rp83h6LpwpYEZAuwKoCQCAkABIEAQAAjPECZcgK5AkDlaTqFS0uKN1S/8AJQmpxXJSXKUX4NNp+ZjekXrNZ9UxMxOsNktMv6d1QpXNF5p1oRnB9uGuT7muTXejzl6TS01n0WdZiY1hyjFIAAAAAAABDeOLA18291/9I31SrB5t6X6m348HTi3mf2m2/Ld7i/4bD8LHETvvKuy357auunQ1oAr2rzAu3wAhAWQEgSAAAQAAqBAEvkBSLAuBAHpPRDtL6Kq9MrS/V1m52rfKFbGZU/BSSyvFP5xXcfg1j4kem7p4fJpPLL14qXYAAAAAAAAdE6WNo/gtr8DpSxcXiak1zp23Kb8HLqr7Xcd3A4ee/PO0fdz8RfSNI9XihcuJAEZAqnxCVmwhIFkBIEgAAACGBVgVYEgUiwlcIAL0qkoSjOEnGcGpQlF4lGSeVJeKaQmNekjYTYjaOOpWcKzwq9PFO5guG7VS6yXzZc17OxlBxOGcV9PT0WOK/PXV2A52wAAAAADhaxqdGzt6t1XeKVGO9LHFyecRivFtpLzM8eOclorX1Y2tFY1lrvr+r1b65qXVbrVH8WKeVTprqwXgl7eL7T0OLHGOsVhXWtNp1ljjNihgVzzA4dGbc5S7NxPyef8Ao1xOtmcx0cx8zYwWYFkBKAkAAAAQwIYFHyAq3wYS49Bv0lRP53Dy3cmFd5ZTtDlLtM2CwBAZ3Y3aOemXUa6zKjPELmmvl0s81+8ua9a7WaeIwxlpy+vozx35J1bC0K0akI1IPehUjGcJdkotZT9jPPzExOkrKOr6EAAAAAPlc29OrCVKrCM6dROM4SSlGUXzTTJiZidYRMa9JeVbV9F04b1bTHvw4t2s5frI+FOb63lLj4stMHHxPTJ7uS/DzHWrzavSnCUoVIzhODxOE4uE4PulF8UyyiYmNYcz5sD5VHzISzPR9sVcatVc950bOjmNevjLlJ4fo6a5OWOb5JPtyk+HNxEYtPm6a4+dip9Z45ZePI73MMIWQF0AAAAAEMCGBTvA5+zmmxvLyhaTnKnG4m4OcUnKD3W00nz4pGvNeaUm0ejOkc1ohxdotAutLvJW10lltzpVYpqnXpN4Uo55Y5NdjXk3pwZYyRzQ2ZKcr402dTSuwh9La3qVZxpUoTqVJvEIQi5Tk+5JETMRGspiNekPVtjOjONNxudTUZzWJQtU1KnB99R8pv8AdXDzKviOO1/Lj9/4dWPh9OtvZ6YVrqAAAAAAAAMHtJspZalHFxTxVSxCvTxCvDw3u1eDyjfh4i+Kfyz/ANNd8db7vINp+j/ULHenCDurdcqtGOZxX79PrLzWV4otsPGY8nSek/v/AC5L4bV/eHW9A0atqN3Cxo/FnUbVScot+gpRw51JLwWMLhltLhk2ZssY6TaUUpNp0bGaLo9Cws4WdsmqdGDSb605PLlOT7ZNtt+ZQ3vN7c0u+I0jRrRE9J6quNlgLIC6AAAAEAGBUCoGb2EeNVsfrEPvyjRxPlW7NmLxw9t202Vt9WtXQqvcqwbnbV0syoVcc8fKi+2Pb4NJqkw5pxW1h33pFo0lr5d6bcW91UsZ05SuaM/RyhTjKo5NYanFJZcWpRa8JIvaZK2pF9ejgtSYnR3bZvozvrlxnd/sdB4bUsSuZLuUPk/a4ruZz5eOpTpXrP0Z04e079Hquz+zNlp8d21pKM2sTqy+PWqecn2eC4eBV5c98s/ml10x1pszBpZgAAAAAAAAAAA+StqSqOsqdP0zjuOpuR9I4Zzu73PGeOCdZ00NH0nyfkyBqu1xfrPTqtIQsgLICQAEAADAqBVgZnYhf2pY/WaXvNHEeVbs2YvHDY88+sVI0YKUpqMVOWFKSilKSXJN9uCdRcgAAAAAAAAAAAAAAAK1OT8mIGrMub8T06qALICwEgAAEAAKsCoGZ2JeNUsX/E0vvlj8zTxHlW7NmPxw2PPPLEAAAAAAAAAAAAAAAAAK1OT8mIGrL5np1UAWQFgAACQIAMCrAqBl9jcfpKxz/wDVQ/Eiac/lW7S2Y/HDZE88sQAAAAAAAAAAAAAAAAApW6svov3ExuNWodVeX5Hp53VMbJRCUgWAgCQAEAAIAgDL7HRf6SsvrVD8RGrP5Vu0s8fjhsgedWQAAAAAAAAAAAAAAAAAVq9WXk/cTA1bxw8uB6dVQhECQJAAAJAgABABgZjZJ41Kxf8AFUPvqI1Z/Kt2lnj8cNjjzqyAAAAAAAAAAAAAAAAAClV4jJ+D9xMDVuMsxT78P7j08qqBECQJAAAAAABABgZbZT/2Nh9at/xImrP5Vu0s8fihsgedWQAAAAAAAAAAAAAAAAAcfUJbtGrL5tOo/ZFmVfFCJ2avQ6sfL8kemndVRssiEpAkAAAAAAEAAMrsq/7RsPrdv+KjVm8u3aWdPFHdsiedWQAAAAAAAAAAAAAAAAAcXVX+z1/7mr/QzKnihE7NYI9WPkemlVxssQJAAAAEgQAAARkDJbMyxf2L/jLZf60P+TXm8u3afsyp4o7w2VPOLMAAAAAAAAAAAAAAAAAOFrjxaXL7qFb8NmePxx3RbaWsfYl4I9JKrgyBYCQAAAAAAQBGQOboMsXlq/m3VrL2VomGTwW7T9mVfFHeGzZ5tZgAAAAAAAAAAAAAAAABjdpp7they+ba3L9lKRswxrkr3hjfwy1nfM9GrEgWAAAJAgAAAAVA5GlyxcUX3VqT9lSL/Ixv4Z7SyjeG0J5pZgAAAAAAAAAAAAAAAABiNsHjTNQfdZ3X4Mjdw/m17x92GXwT2lrYehVwBYISBIEASAAgCGBVhL6WssVKcu6cH7JIidpIbTHmVoAAAAAAAAAAAAAAAAAGE23ljStQz22lwvW6ckvebuG86veGGXwT2a3s9CrggWRKFgAAAAAAVYFWEvraJOpTT5OcM+W8skTtJG7aY8ytAAAAAAAAAAAAAAAAAAxG1unVbuwubag4KrWp7sN9tQ5ptNpPGUmjbgvFMkWttDDJWbVmIeH3ewes0m96yqyS7ac6dVP1Rln7i6ji8M/8nFOG8ejF1dEvocJ2d5D6VpWj/tNsZaTtaPeGHLaPSfZxp2tWPOlVXnSmvyMuaPmjSVN2S5xa800TqAAIAADdb5JvyTY1S+kLStLq0qsvo0py9yI5o+ZpPycmlod/PqWd7L6NpWa/pMZy443tHvCeW3yn2ZG02H1mrJKNlWjnlKru0ox8XvPOPVk1TxWGN7MvhXn0bElAsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z",
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRrT5hHxTi7gOqYrRQsvmWvjSO8hEPGTMQxg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6r-Bgu0F0vOyvC1Vwr_KGaJGL6v9Di82xCA&usqp=CAU",
  ];

  const number = Math.floor(Math.random() * img.length);

  const addToCartFunc = (p: String) => {
    addToCart(p);
  };

  const removeFromCartFunc = (p: String) => {
    cart.map((d: String) => {
      if (d === params.id) {
        removeFromCart(d);
      } else {
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    axios(`/api/items/find/${params.id}`)
      .then((res: any) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="w-full text-gray-600 dark:text-white dark:bg-[#000] body-font overflow-hidden">
      <Header />
      <div className="container px-5 py-24 mx-auto w-full">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="w-full">
            {product && (
              <img
                alt="ecommerce"
                className=" dark:bg-[#262A2E] lg:w-1/2 w-full lg:h-auto h-[400px] object-cover object-center rounded"
                src={img[number]}
              />
            )}

            {!product && (
              <div className="animate-pulse bg-[#101010] lg:w-1/2 w-full h-[400px] rounded relative"></div>
            )}
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              <Logo styles={"w-[0px] "} />
            </h2>
            {product && (
              <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium my-4">
                {product.title}
              </h1>
            )}

            <div>
              {/* Title skeleton */}
              {!product && (
                <div className="animate-pulse my-4 w-3/4 bg-[#101010] h-[10px] rounded-md "></div>
              )}
            </div>

            <div>
              {/* description and description skeleton */}
              <p className="leading-relaxed">{product?.description}</p>
              {!product && <DescriptionSkeleton />}
            </div>

            <div className="flex justify-between mt-8">
              <div>
                <span className="title-font font-medium text-2xl dark:text-white text-gray-900">
                  {product && `₦ ${product.price}`}
                </span>
                {!product && (
                  <div className="animate-pulse my-4 w-[130px] h-[20px] bg-[#101010] rounded-md "></div>
                )}
              </div>
              <button
                onClick={() => addToCartFunc(params.id)}
                className="flex justify-center items-center text-white bg-secondary  border-0 py-2 px-6 focus:outline-none hover:bg-primary rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
