import React from 'react'
import {Search} from "lucide-react";
import RecipeCard from '../Components/RecipeCard';

const HomePage = () => {
  return (
    <div className='bg-[#faf9fe] p-10 flex-1'>
      <div className="max-w-screen-lg mx-auto">
        <form>
          <label className='input shadow-md flex items-center gap-2'>
            <Search size={"24"}/>
            <input type="text" className='text-sm md:text-md grow' placeholder='What do you want to cook today?'/>
          </label>
        </form>

        <p className='font-bold text-3cl md:text-5xl mt-4'>Recommended Recipes</p>
        <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular choices</p>

        <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {/* first recipe */}

          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />


         
          
        </div>
      </div>
    </div>
  )
}

export default HomePage
