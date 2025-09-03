import React from 'react';
import { CreditCard, CalendarDays, BadgeCheck, BadgeX, Timer, Download, DollarSign } from "lucide-react";
import { jsPDF } from 'jspdf';
import { gymLogoBase64 } from '../../assets/assets';
import { formatDate } from '../../utils/utilFunctions';


const PaymentHistoryCard = ({ membership, name }) => {


  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo image (x, y, width, height)
    doc.addImage(gymLogoBase64, 'PNG', 20, 6, 30, 30);

    // Gym name and address next to logo
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Minimalist Gyms", 55, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Raj College More, Burdwan, WB, 713101, India", 55, 24);
    doc.text("Contact: +91 9999999999 | www.minimalistgyms.com", 55, 30);

    // Line separator
    doc.setDrawColor(200);
    doc.line(20, 35, 190, 35);

    // Invoice Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Membership Invoice", 20, 45);

    // Membership Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const lines = [
      `Name: ${name}`,
      `Plan Type: ${membership.planType}`,
      `Order ID: ${membership.orderId}`,
      `Payment ID: ${membership.paymentId}`,
      `Payment Method: ${membership.paymentMethod}`,
      `Payment Status: ${membership.paymentStatus}`,
      `Amount: Rs. ${membership.amount}`,
      `Payment Date: ${formatDate(membership.createdAt)}`,
      `Expires on: ${formatDate(membership.planEndDate)}`,
    ];

    lines.forEach((line, index) => {
      doc.text(line, 20, 60 + index * 10);
    });

    // Save the PDF
    doc.save(`invoice_minimalist_gyms.pdf`);
  };

  return (
    <div className="rounded bg-slate-900 shadow-lg p-3 sm:p-6 transition duration-300 text-xs sm:text-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100">Plan: {membership?.planType.toUpperCase()}</h2>
        <button
          onClick={generatePDF}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-4 py-1 rounded-full transition duration-200 cursor-pointer text-slate-300 hover:text-white"
        >
          <Download size={20} />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-slate-300">
        <p><CreditCard className="inline mr-2 text-orange-600" size={16} /><strong>Payment ID:</strong> {membership?.paymentId}</p>
        <p><CreditCard className="inline mr-2 text-orange-600" size={16} /><strong>Order ID:</strong> {membership?.orderId}</p>
        <p><CalendarDays className="inline mr-2 text-orange-600" size={16} /><strong>Transaction Date:</strong> {formatDate(membership?.createdAt)}</p>
        <p><CalendarDays className="inline mr-2 text-orange-600" size={16} /><strong>Expires on:</strong> {formatDate(membership?.planEndDate)}</p>
        <p><DollarSign className="inline mr-2 text-orange-600" size={16} /><strong>Amount:</strong> ₹{membership?.amount}</p>
        <p><CreditCard className="inline mr-2 text-orange-600" size={16} /><strong>Payment Method:</strong> {membership?.paymentMethod}</p>
        <p><Timer className="inline mr-2 text-orange-600" size={16} /><strong>Payment status:</strong> {membership?.paymentStatus}</p>
        <p><BadgeCheck className="inline mr-2 text-orange-600" size={16} /><strong>Plan status: </strong>
          <span className={`${membership.planStatus === "active" ? 'text-green-600' : 'text-red-600'}`}>
            {membership?.planStatus === "active" ? (
              <>
                Active
              </>
            ) : (
              <>
                {membership?.planStatus}
              </>
            )}

          </span>
        </p>
      </div>
    </div>
  );
};

export default PaymentHistoryCard;
