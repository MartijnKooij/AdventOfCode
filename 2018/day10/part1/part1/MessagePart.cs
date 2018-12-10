using System.Drawing;

namespace part1
{
    public class MessagePart
    {
        public PointF Position { get; }
        public PointF Velocity { get; }

        public MessagePart(string positionX, string positionY, string velocityX, string velocityY)
        {
            Position = new PointF(int.Parse(positionX), int.Parse(positionY));
            Velocity = new PointF(int.Parse(velocityX), int.Parse(velocityY));
        }
    }
}