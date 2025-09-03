import { Link } from "react-router-dom";
import { Ticket, Download } from "lucide-react";




export default function DayPass() {

  return (
    <div className="flex flex-col gap-10 items-center justify-center my-20">
      <Link
        to="/day-pass/buy-pass"
        className="flex items-center gap-2 px-6 py-2 border border-orange-600  hover:bg-orange-600 hover:text-white transition-all duration-200 rounded-full"
      >
        <Ticket className="w-4 h-4" />
        Buy Day-Pass
      </Link>

      <Link
        to="/day-pass/all-passes"
        className="flex items-center gap-2 px-6 py-2 border border-orange-600  hover:bg-orange-600 hover:text-white transition-all duration-200 rounded-full"
      >
        <Download className="w-4 h-4" />
        Your Day-Pass
      </Link>
    </div>
  )


}