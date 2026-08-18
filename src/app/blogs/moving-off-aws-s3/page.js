import Breadcrumb from "@/components/common/Breadcrumb";
import Navbar from "@/components/common/Navbar";

export const metadata = {
    title: "Moving Off AWS S3 Without Rewriting Your App | Neviri Cloud",
    description:
        "S3 bills you twice: once to store, again on egress every time files are read. See how to move to S3-compatible object storage with a one-line endpoint change and cut your transfer costs.",
    alternates: {
        canonical: "https://neviri.com/blogs/moving-off-aws-s3",
    },
    openGraph: {
        title: "Moving Off AWS S3 Without Rewriting Your App",
        description:
            "S3 bills you twice: once to store, again on egress. Move to S3-compatible object storage with a one-line endpoint change and cut transfer costs.",
        url: "https://neviri.com/blogs/moving-off-aws-s3",
        type: "article",
        images: [
            "https://neviri.com/images/blogs/migrating-from-expensive-cloud-storage.png",
        ],
    },
};

function P({ children }) {
    return (
        <p className="text-[#4B5565] text-lg leading-relaxed mb-4">{children}</p>
    );
}

function Code({ children }) {
    return (
        <pre className="bg-[#0F172A] text-[#E2E8F0] rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mb-6">
            <code>{children}</code>
        </pre>
    );
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2C]">
            <Navbar />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Breadcrumb />
                </div>

                <article>
                    <header className="mb-8">
                        <span className="inline-block bg-sky-600 text-white px-3 py-1 rounded text-sm mb-4">
                            Object Storage
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1F2C] mb-4 leading-tight">
                            Moving off AWS S3 without rewriting your app
                        </h1>
                        <p className="text-xl text-[#4B5565]">
                            The storage line is cheap. The transfer line is the one that grows.
                        </p>
                    </header>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/blogs/migrating-from-expensive-cloud-storage.png"
                        alt="Migrating from expensive AWS S3 cloud storage to affordable Neviri object storage with low-cost egress"
                        className="w-full rounded-lg border border-[#DDE3EA] mb-10"
                    />

                    <section className="mb-10">
                        <P>
                            Open your AWS bill and the storage line looks reasonable. Scroll
                            down to data transfer. That number climbs every month, and it has
                            little to do with how much you keep. It tracks how often people
                            read your files.
                        </P>
                        <P>
                            S3 bills you twice. Once to hold the bytes, and again every time
                            someone downloads them. Teams budget for the first charge and get
                            surprised by the second.
                        </P>
                        <P>
                            Say you host user uploads, product images, or backups on S3.
                            Storage might run you twenty dollars a month. Then a launch goes
                            well, traffic triples, and your transfer-out line jumps to three
                            hundred. You stored nothing new. People read what was already
                            there.
                        </P>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4">
                            What &quot;S3-compatible&quot; gives you
                        </h2>
                        <P>
                            The S3 API became the way software talks to object storage. Your
                            SDK, CLI, backup tool, and CI pipeline all speak it. A provider
                            that implements the same API lets those tools point somewhere else
                            without a rewrite.
                        </P>
                        <P>For most apps, the code change looks like this:</P>
                        <Code>{`# before
s3 = boto3.client("s3", region_name="us-east-1")

# after
s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.neviri.com",
    aws_access_key_id=KEY,
    aws_secret_access_key=SECRET,
)`}</Code>
                        <P>
                            That is the change: a new endpoint and your keys.{" "}
                            <code>get_object</code>, <code>put_object</code>,{" "}
                            <code>list_objects_v2</code>, presigned URLs, and multipart uploads
                            all keep working, because they hit the same API. The{" "}
                            <code>aws</code> CLI works the same way with{" "}
                            <code>--endpoint-url</code>. So does <code>rclone</code>,{" "}
                            <code>s3cmd</code>, and most backup software that already targets
                            S3.
                        </P>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4">
                            Where the cost drops
                        </h2>
                        <P>
                            AWS charges around nine cents per gigabyte to move data out to the
                            internet, and the price holds near there until you pass terabytes.
                            Neviri charges $0.072 per GB and includes 100 GB free per account
                            before metering starts.
                        </P>
                        <P>
                            Run the math on a busy month. A site serving two terabytes of
                            images out of S3 pays about $180 in egress. The same traffic on
                            Neviri costs $144. Storage costs about the same either way. The
                            difference shows up in transfer.
                        </P>
                        <P>
                            If your workload reads far more than it writes, and most
                            public-facing apps do, egress is the line worth attacking first.
                        </P>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4">
                            What to check before you switch
                        </h2>
                        <P>
                            Object storage has three details that trip up a move. Sort them out
                            before you migrate.
                        </P>
                        <P>
                            <strong>Path style versus virtual host.</strong> AWS defaults to{" "}
                            <code>bucket.s3.amazonaws.com</code>. Neviri serves path style:{" "}
                            <code>s3.neviri.com/bucket/key</code>. Most SDKs handle this with
                            one config flag. Set <code>addressing_style</code> to{" "}
                            <code>path</code> in boto3, or <code>--s3-force-path-style</code> in
                            the CLI, and links resolve.
                        </P>
                        <P>
                            <strong>CORS on the bucket.</strong> If a browser reads your objects
                            with <code>fetch</code> or an image tag from a different origin, the
                            bucket needs a CORS rule. Copy the same origins you allow on S3.
                        </P>
                        <P>
                            <strong>Public read.</strong> A bucket is private until you say
                            otherwise. If you serve public images, set the read policy on the
                            new bucket to match. Test one file in an incognito window before you
                            flip DNS.
                        </P>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4">
                            A migration you can run this afternoon
                        </h2>
                        <P>
                            <code>rclone</code> copies between any two S3-compatible stores and
                            verifies checksums as it goes. Set up two remotes, one for AWS and
                            one for Neviri, then sync:
                        </P>
                        <Code>{`rclone sync aws:my-bucket neviri:my-bucket --progress --checksum`}</Code>
                        <P>
                            For a first pass, run it while your app still points at S3. The copy
                            only reads from S3, so your live app keeps serving. Copying that
                            data out of AWS counts as egress, so budget for the transfer. When
                            the copy finishes, point your app at the new endpoint, run the sync
                            once more to catch anything written in between, and watch your logs.
                            Roll back by changing the endpoint string if something looks wrong.
                            You kept the source intact.
                        </P>
                        <P>
                            Large datasets take longer. Run the bulk copy over a weekend, do a
                            final delta sync at cutover, and the only pause your readers see is
                            the moment you switch endpoints.
                        </P>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4">
                            Where this fits
                        </h2>
                        <P>
                            Object storage suits files your app hands out but does not query:
                            uploads, exports, static assets, database dumps, build artifacts.
                            Anything you would have put in an S3 bucket has a home here, read by
                            the same code.
                        </P>
                        <P>
                            Cheaper storage is a nice line item, but predictable egress is the
                            one your finance team notices. Because the egress rate is lower and
                            you know it up front, you can predict the bill even as traffic
                            grows.
                        </P>
                        <P>
                            Point one bucket at Neviri this week. Copy a real workload, watch
                            the transfer line for a billing cycle, and compare. Your code keeps
                            speaking the same S3 API. The only thing that changes is what you
                            pay to move the bytes out.
                        </P>
                    </section>
                </article>
            </div>
        </div>
    );
}
