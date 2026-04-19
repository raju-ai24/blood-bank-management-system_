import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Hospital, RefreshCw, Clock } from "lucide-react";
import { toast } from "react-hot-toast";

const AdminCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCamps = async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch("https://blood-bank-management-system-backend-r7cp.onrender.com/api/admin/camps", {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch camps");
      }

      const data = await res.json();
      setCamps(data.camps || []);
      
      if (showToast) {
        toast.success("Camps updated successfully!");
      }
    } catch (err) {
      console.error("Camps error:", err);
      toast.error("Failed to load camps");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Upcoming': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'Ongoing': { bg: 'bg-green-100', text: 'text-green-700' },
      'Completed': { bg: 'bg-gray-100', text: 'text-gray-700' },
      'Cancelled': { bg: 'bg-red-100', text: 'text-red-700' },
    };
    const config = statusConfig[status] || statusConfig['Upcoming'];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <Calendar className="w-12 h-12 text-red-500 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Blood Camps
          </h2>
          <p className="text-gray-500">Fetching camp information...</p>
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
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Blood Donation Camps</h1>
                <p className="text-gray-600 mt-1">
                  Monitor and manage upcoming blood donation camps
                </p>
              </div>
            </div>
            
            <button
              onClick={() => fetchCamps(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-red-600">{camps.length}</div>
              <div className="text-sm text-gray-600">Total Camps</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-blue-600">
                {camps.filter(c => c.status === 'Upcoming').length}
              </div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-green-600">
                {camps.filter(c => c.status === 'Ongoing').length}
              </div>
              <div className="text-sm text-gray-600">Ongoing</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-gray-600">
                {camps.filter(c => c.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        {/* Camps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl shadow-lg border border-red-100 p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No camps found</h3>
              <p className="text-gray-500">There are no blood donation camps scheduled yet.</p>
            </div>
          ) : (
            camps.map((camp) => (
              <div key={camp._id} className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{camp.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Hospital className="w-4 h-4" />
                        {camp.hospital?.name || 'Unknown Hospital'}
                      </div>
                    </div>
                    {getStatusBadge(camp.status)}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span>{new Date(camp.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>{camp.time?.start} - {camp.time?.end}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{camp.location?.venue}, {camp.location?.city}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{camp.actualDonors || 0} / {camp.expectedDonors || 0} donors</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCamps;
