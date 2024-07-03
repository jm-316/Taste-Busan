"use client";

import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center fixed w-full h-[52px] top-0 shadow-sm bg-white z-[100]">
        <Link
          href="/"
          className="text-blue-800 text-lg font-semibold cursor-pointer px-[18px] py-0">
          TASTEBUSAN
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜한 가게
          </Link>
          <Link href="/users/mypage" className="navbar__list--item">
            마이페이지
          </Link>
          <Link href="" className="navbar__list--item">
            로그인
          </Link>
        </div>
        <div
          className="navbar__button"
          onClick={() => setIsOpen((val) => !val)}>
          {isOpen ? <IoClose /> : <IoMenu />}
        </div>
        {isOpen && (
          <div className="navbar--mobile">
            <div className="navbar__list--mobile">
              <Link href="/stores" className="navbar__list--item--mobile">
                맛집 목록
              </Link>
              <Link href="/stores/new" className="navbar__list--item--mobile">
                맛집 등록
              </Link>
              <Link href="/users/likes" className="navbar__list--item--mobile">
                찜한 가게
              </Link>
              <Link href="/users/mypage" className="navbar__list--item--mobile">
                마이페이지
              </Link>
              <Link href="" className="navbar__list--item--mobile">
                로그인
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
