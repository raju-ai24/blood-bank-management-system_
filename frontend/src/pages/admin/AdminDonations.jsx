import { useState, useEffect } from "react";
import { Droplet, Calendar, User, MapPin, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDonations = async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch("https://blood-bank-management-system-backend-r7cp.onrender.com/api/admin/donations", {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch donations");
      }

      const data = await res.json();
      setDonations(data.donations || []);
      
      if (showToast) {
        toast.success("Donations updated successfully!");
      }
    } catch (err) {
      console.error("Donations error:", err);
      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <Droplet className="w-12 h-12 text-red-500 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Donation History
          </h2>
          <p className="text-gray-500">Fetching donation records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-xl">
                <Droplet className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Donation History</h1>
                <p className="text-gray-600 mt-1">
                  View all blood donation records across the system
                </p>
              </div>
            </div>
            
            <button
              onClick={() => fetchDonations(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-red-600">{donations.length}</div>
              <div className="text-sm text-gray-600">Total Donations</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-blue-600">
                {new Set(donations.map(d => d.bloodGroup)).size}
              </div>
              <div className="text-sm text-gray-600">Blood Types</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-green-600">
                {donations.reduce((sum, d) => sum + (d.units || 1), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Units</div>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-50 border-b border-red-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Donor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Blood Group</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Units</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No donation records found
                    </td>
                  </tr>
                ) : (
                  donations.map((donation, index) => (
                    <tr key={index} className="hover:bg-red-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <User className="w-4 h-4 text-red-600" />
                          </div>
                          <span className="font-medium text-gray-800">{donation.donorName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          {donation.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(donation.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {donation.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        {donation.units} unit(s)
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDonations;
