using System;
using System.Collections.Generic;

namespace bookstore.Server.Entities;

public partial class Payment
{
    public int PaymentId { get; set; }

    public string MethodName { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
