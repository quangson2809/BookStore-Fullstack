namespace bookstore.Server.SessionCookies
{
    public interface ISessionManager
    {
        public int GetCurrentUserId();
        public void SetCurrentUserID(int UserID);
        public void ClearSessionState();
    }
}
